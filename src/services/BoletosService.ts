import {IBoleto, IMonth} from '../models/boleto.model';
import {loadAll, save} from './Storage/Storage';
import create from 'zustand';

interface IUseStoreBoletos {
  load: () => Promise<IBoleto[] | undefined>;
  save: (oldBoletos: IBoleto[], newBoleto: IBoleto) => void;
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
    await save(newBoleto);
    // setBoletosStatus([newBoleto]);
    set({boletos: [...oldBoletos, newBoleto]});
  },
}));

const setBoletosStatus = (boletos: IBoleto[]): void => {
  const today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );
  boletos.map(boleto => {
    const dueDate = new Date(
      new Date(boleto.dueDate as Date).getFullYear(),
      new Date(boleto.dueDate as Date).getMonth(),
      new Date(boleto.dueDate as Date).getDate(),
    );

    if (boleto.status !== 'PAID') {
      if (dueDate >= today) {
        boleto.status = 'TO_BE_PAID';
      } else {
        boleto.status = 'LATE';
      }
    }
  });
};

const getBoletoStatus = (boletos: IBoleto[], monthDate: Date): IBoleto[] => {
  const boletosWithStatus: IBoleto[] = [];
  boletos.forEach(boleto => {
    const dueDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      new Date(boleto.dueDate as Date).getDate(),
    );

    if (boleto.status !== 'PAID') {
      if (dueDate >= new Date()) {
        boleto.status = 'TO_BE_PAID';
        console.log('TO_BE_PAID', boleto, dueDate);
      } else {
        boleto.status = 'LATE';
        console.log('LATE', boleto, dueDate);
      }
    }

    boletosWithStatus.push(boleto);
  });

  return boletosWithStatus;
};

export const loadFromStorage = async (): Promise<IBoleto[]> => {
  const boletos: IBoleto[] | undefined = await loadAll();
  // setBoletosStatus(boletos);
  return boletos;
};

export function buildTheYear(boletos: IBoleto[]): IMonth[] {
  const months: IMonth[] = [];
  //pega o mês atual e mais 11 meses seguintes
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(new Date().getMonth() + i);
    const monthName = date.toLocaleString('default', {month: 'long'});

    const thisMonthsBoletos = Array.from(boletos).filter(boleto => {
      return (
        new Date(boleto.dueDate).getMonth() === date.getMonth() ||
        boleto.isRecurrent
      );
    });

    months.push({
      name: monthName.charAt(0).toUpperCase() + monthName.slice(1),
      year: date.getFullYear().toString(),
      boletos: getBoletoStatus(thisMonthsBoletos, date),
    });
  }
  console.log(JSON.stringify(months));

  return months;
}
