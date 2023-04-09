import {IPaidBoleto} from '../models/boleto.model';

export const paidBoletoCompKeyGenerator = (paidBoleto: IPaidBoleto) => {
  return (
    paidBoleto.idBoleto + new Date(paidBoleto.paidBoletoMonth).toISOString()
  );
};
