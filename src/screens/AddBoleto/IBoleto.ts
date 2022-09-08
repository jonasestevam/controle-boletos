import {TPeriod} from '.';
export type StatusBoletos = 'PAID' | 'TO_BE_PAID' | 'LATE';

export default interface IBoleto {
  id: string;
  description: string;
  isRecurrent: boolean;
  period: TPeriod;
  price: number;
  status?: StatusBoletos;
  dueDate: Date | undefined;
}
