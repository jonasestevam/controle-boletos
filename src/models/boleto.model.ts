export type TStatusBoletos = 'PAID' | 'TO_BE_PAID' | 'LATE';

export type TPeriod = 'MONTHLY' | 'WEEKLY' | 'ONCE';

export interface IBoleto {
  id: string;
  description: string;
  isRecurrent: boolean;
  period: TPeriod;
  price: number;
  status?: TStatusBoletos;
  dueDate: Date;
}

export interface IMonth {
  name: string;
  year: string;
  boletos: IBoleto[] | undefined;
  outcome: number;
  income: number;
}
