import AsyncStorage from '@react-native-async-storage/async-storage';
import {nanoid} from 'nanoid';
import 'react-native-get-random-values';
import Storage from 'react-native-storage';
import {IBoleto, IPaidBoleto} from '../../models/boleto.model';
import {paidBoletoCompKeyGenerator} from '../../utils/compositeKeyGen';

const storage = new Storage({
  size: 25000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

const generateUUID = (boleto: IBoleto): void => {
  boleto.id = nanoid();
};

export const loadAllBoletos = async (): Promise<IBoleto[]> => {
  try {
    return await storage.load({key: 'boletos'});
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const saveBoleto = async (boleto: IBoleto): Promise<void> => {
  try {
    generateUUID(boleto);
    const boletos = await storage.load({key: 'boletos'});
    storage.save({key: 'boletos', data: [...boletos, boleto]});
  } catch (error) {
    storage.save({key: 'boletos', data: [boleto]});
    console.error(error);
  }
};

export const savePaidBoleto = async (
  paidBoleto: IPaidBoleto,
): Promise<void> => {
  try {
    const paidBoletos: IPaidBoleto[] = await storage.load({key: 'paidBoletos'});

    if (
      paidBoletos.filter(
        paid =>
          paid.idBoleto === paidBoleto.idBoleto &&
          new Date(paid.paidBoletoMonth) ===
            new Date(paidBoleto.paidBoletoMonth),
      ).length
    )
      return;

    paidBoleto.compositeKey = paidBoletoCompKeyGenerator(paidBoleto);

    storage.save({key: 'paidBoletos', data: [...paidBoletos, paidBoleto]});
  } catch (error) {
    console.log('savePaidBoleto', error);
    storage.save({key: 'paidBoletos', data: [paidBoleto]});
  }
};

export const deletePaidBoleto = async (boletoToDelete: IPaidBoleto) => {
  try {
    const allBoletos = await loadPaidBoleto();

    const newPaidBoletos = allBoletos.filter(savedBoleto => {
      const boletoToDeleteCompKey = paidBoletoCompKeyGenerator(boletoToDelete);
      return savedBoleto.compositeKey !== boletoToDeleteCompKey;
    });

    console.log('allboletos', allBoletos);
    console.log('newPaidBoletos', newPaidBoletos);

    await storage.save({key: 'paidBoletos', data: newPaidBoletos});
  } catch (error) {
    console.log(error);
  }
};

export const loadPaidBoleto = async (): Promise<IPaidBoleto[]> => {
  try {
    return await storage.load({key: 'paidBoletos'});
  } catch (error) {
    console.error('loadPaidBoleto', error);
    return [];
  }
};
