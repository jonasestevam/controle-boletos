import IBoleto from '../screens/AddBoleto/IBoleto';
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
    setBoletosStatus([newBoleto]);
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

export const loadFromStorage = async (): Promise<IBoleto[]> => {
  const boletos: IBoleto[] | undefined = await loadAll();
  setBoletosStatus(boletos);
  return boletos;
};
