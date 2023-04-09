import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';
import 'react-native-get-random-values';
import Storage from 'react-native-storage';
import { IBoleto } from '../../models/boleto.model';

const storage = new Storage({
  size: 25000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

const generateUUID = (boleto: IBoleto): void => {
  boleto.id = nanoid();
};

export const loadAll = async (): Promise<IBoleto[]> => {
  try {
    return await storage.load({key: 'boletos'});
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const save = async (boleto: IBoleto) => {
  try {
    generateUUID(boleto);
    const boletos = await storage.load({key: 'boletos'});
    storage.save({key: 'boletos', data: [...boletos, boleto]});
  } catch (error) {
    storage.save({key: 'boletos', data: [boleto]});
    console.error(error);
  }
};
