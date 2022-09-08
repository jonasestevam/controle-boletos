import React, {useEffect, useState} from 'react';
import {ListRenderItem} from 'react-native';
import AddButton from '../../components/AddButton';
import BoletoCard from '../../components/BoletoCard';
import Indicator from '../../components/Indicator';
import {translate} from '../../i18n/locales';
import {useStoreBoletos} from '../../services/BoletosService';
import getMonthNameByNumber from '../../utils/getMonthNameByNumber';
import {
  BoletosList,
  Container,
  HeaderContainer,
  HeaderText,
  IndicatorsContainer,
  SubHeaderText,
} from './styles';

const HomeScreen = ({navigation}) => {
  const [isLoading] = useState(false);
  const [outcomeValue, setOutcomeValue] = useState(0);

  const loadBoletos = useStoreBoletos(state => state.load);
  const boletos = useStoreBoletos(state => state.boletos);

  const RenderItem: ListRenderItem<any> = ({item}) => (
    <BoletoCard boleto={item} />
  );

  const onClickAddHandler = () => {
    navigation.push('AddBoleto');
  };

  useEffect(() => {
    (async () => {
      await loadBoletos();
    })();
  }, [loadBoletos]);

  useEffect(() => {
    if (boletos.length) {
      const outcome = boletos.reduce((accumulator, boleto) => {
        return accumulator + Number(boleto.price);
      }, 0);
      setOutcomeValue(outcome);
    }
  }, [boletos]);

  return (
    <>
      {!isLoading && (
        <>
          <Container>
            <HeaderContainer>
              <HeaderText>
                {translate(getMonthNameByNumber(new Date().getMonth() + 1))}
              </HeaderText>
              <SubHeaderText>{new Date().getFullYear()}</SubHeaderText>
            </HeaderContainer>
            <IndicatorsContainer>
              <Indicator amount={0} type="income" />
              <Indicator amount={outcomeValue} type="outcome" />
            </IndicatorsContainer>
            <BoletosList data={boletos} renderItem={RenderItem} />
          </Container>
          <AddButton action={onClickAddHandler} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
