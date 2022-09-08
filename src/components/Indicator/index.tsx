import React from 'react';
import {IIndicator} from './IIndicator';
import {
  Arrow,
  Container,
  AmountText,
  ArrowContainer,
  TypeText,
  SubContainer,
} from './styles';
import {translate} from '../../i18n/locales';
import currencyFormat from '../../utils/currencyFormat';

const Indicator = ({type, amount}: IIndicator) => {
  return (
    <Container amount={amount} type={type}>
      <ArrowContainer type={type}>
        <Arrow type={type} name={type === 'income' ? 'caretup' : 'caretdown'} />
      </ArrowContainer>
      <SubContainer>
        <TypeText>
          {type === 'income' ? translate('INCOME') : translate('OUTCOME')}
        </TypeText>
        <AmountText>{currencyFormat(Number(amount))}</AmountText>
      </SubContainer>
    </Container>
  );
};

export default Indicator;
