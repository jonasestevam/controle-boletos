import create from 'zustand';
import {
  IBoleto,
  IMonth,
  IPaidBoleto,
  TStatusBoletos,
} from '../models/boleto.model';
import {
  deleteBoleto,
  deletePaidBoleto,
  editBoleto,
  loadAllBoletos,
  loadPaidBoleto,
  saveBoleto,
  savePaidBoleto,
} from './Storage/Storage';

interface IUseStoreBoletos {
  load: () => Promise<IBoleto[] | undefined>;
  save: (oldBoletos: IBoleto[], newBoleto: IBoleto) => void;
  edit: (editedBoletos: IBoleto) => void;
  delete: (idBoleto: string) => void;
  boletos: IBoleto[];
}

export const useStoreBoletos = create<IUseStoreBoletos>(set => ({
  boletos: [],
  load: async () => {
    const boletos = await loadFromStorage();
    set({boletos: boletos});
    return boletos;
  },

  save: async (oldBoletos, newBoleto) => {
    await saveBoleto(newBoleto);
    set({boletos: [...oldBoletos, newBoleto]});
  },

  edit: async editedBoletos => {
    const newBoletos = await editBoleto(editedBoletos);
    set({boletos: newBoletos});
  },

  delete: async boletoId => {
    const newBoletos = await deleteBoleto(boletoId);
    set({boletos: newBoletos});
  },
}));

export const loadFromStorage = async (): Promise<IBoleto[]> => {
  const boletos: IBoleto[] = await loadAllBoletos();
  return boletos;
};

export async function buildTheYear(boletos: IBoleto[]): Promise<IMonth[]> {
  const todayDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );
  const months: IMonth[] = [];

  const paidBoletos = await loadPaidBoleto();

  for (let i = 0; i < 12; i++) {
    const monthDate = new Date();
    monthDate.setMonth(new Date().getMonth() + i);
    const monthName = monthDate.toLocaleString('default', {month: 'long'});

    const monthsBoletos: IBoleto[] = boletos
      .filter(
        item =>
          new Date(item.dueDate).getMonth() === monthDate.getMonth() ||
          item.isRecurrent,
      )
      .map(item => {
        item.dueDate = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth(),
          new Date(item.dueDate).getDate(),
        );

        if (
          paidBoletos.find(
            paid =>
              paid.idBoleto == item.id &&
              new Date(paid.paidBoletoMonth).toString() ==
                new Date(item.dueDate).toString(),
          )
        ) {
          return {...item, status: 'PAID'};
        } else {
          const isNotLate = new Date(item.dueDate) >= todayDate;
          return {...item, status: isNotLate ? 'TO_BE_PAID' : 'LATE'};
        }
      });

    months.push({
      index: monthDate.getMonth(),
      name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      year: monthDate.getFullYear().toString(),
      boletos: monthsBoletos,
      income: 0,
      outcome: monthsBoletos.reduce((accumulator, boleto) => {
        return accumulator + Number(boleto.price);
      }, 0),
    });
  }
  return months;
}

export const setAsPaid = async (boleto: IBoleto) => {
  const paidBoleto: IPaidBoleto = {
    idBoleto: boleto.id,
    paidBoletoMonth: boleto.dueDate,
  };

  savePaidBoleto(paidBoleto);
};

export const getBoletoStatus = (boleto: IBoleto): TStatusBoletos => {
  const todayDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );

  return new Date(boleto.dueDate) >= todayDate ? 'TO_BE_PAID' : 'LATE';
};

export const unsetAsPaid = async (boleto: IBoleto) => {
  const paidBoleto: IPaidBoleto = {
    idBoleto: boleto.id,
    paidBoletoMonth: boleto.dueDate,
  };
  deletePaidBoleto(paidBoleto);
};
