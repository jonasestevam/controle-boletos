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
    set({boletos: [...oldBoletos, newBoleto]});
  },
}));

export const loadFromStorage = async (): Promise<IBoleto[]> => {
  const boletos: IBoleto[] | undefined = await loadAll();
  return boletos;
};

export function buildTheYear(boletos: IBoleto[]): IMonth[] {
  const todayDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );
  const months: IMonth[] = [];

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
        if (!item.status) {
          const isNotLate =
            new Date(item.dueDate) >= todayDate ||
            new Date(item.dueDate).getMonth() < monthDate.getMonth() ||
            new Date(item.dueDate).getFullYear() < monthDate.getFullYear();

          return {...item, status: isNotLate ? 'TO_BE_PAID' : 'LATE'};
        } else {
          return {...item};
        }
      });

    months.push({
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
