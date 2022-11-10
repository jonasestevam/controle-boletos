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
}

export function buildTheYear(boletos: IBoleto[]): IMonth[] {
  const months: IMonth[] = [];
  //pega o mês atual e mais 11 meses seguintes
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(new Date().getMonth() + i);
    months.push({
      name: date.toLocaleString('default', {month: 'long'}),
      year: date.getFullYear().toString(),
      boletos: boletos.filter(boleto => {
        return (
          (new Date(boleto.dueDate).getMonth() === date.getMonth() ||
            boleto.isRecurrent) &&
          new Date(boleto.dueDate) < date
        );
      }),
    });
  }

  return months;
}
