import React, {useEffect, useState} from 'react';
import {ListRenderItem, View} from 'react-native';
import AddButton from '../../components/AddButton';
import BoletoCard from '../../components/BoletoCard';
import Indicator from '../../components/Indicator';
import {IMonth} from '../../models/boleto.model';
import {buildTheYear, useStoreBoletos} from '../../services/BoletosService';
import {
  BoletosList,
  ButtonChangePage,
  Container,
  HeaderContainer,
  HeaderText,
  IndicatorsContainer,
  MonthsList,
  MonthsListContainer,
  SubHeaderText,
} from './styles';

const HomeScreen = ({navigation}: any) => {
  const [isLoading] = useState(false);
  const [months, setMonths] = useState<IMonth[]>();

  const loadBoletos = useStoreBoletos(state => state.load);
  const boletos = useStoreBoletos(state => state.boletos);

  const RenderBoletos: ListRenderItem<any> = ({item}) => (
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
    (async () => {
      if (boletos.length) {
        setMonths(await buildTheYear(boletos));
      }
    })();
  }, [boletos]);

  const RenderMonthsItem: ListRenderItem<IMonth> = ({item}) => {
    return (
      <MonthsListContainer>
        <HeaderContainer>
          <ButtonChangePage name="caretleft" direction="left" />
          <View>
            <HeaderText>{item.name}</HeaderText>
            <SubHeaderText>{item.year}</SubHeaderText>
          </View>
          <ButtonChangePage name="caretright" direction="right" />
        </HeaderContainer>
        <IndicatorsContainer>
          <Indicator amount={item.income} type="income" />
          <Indicator amount={item.outcome} type="outcome" />
        </IndicatorsContainer>
        <BoletosList data={item.boletos} renderItem={RenderBoletos} />
      </MonthsListContainer>
    );
  };
  return (
    <>
      {!isLoading && (
        <>
          <Container>
            <MonthsList
              horizontal
              pagingEnabled
              data={months}
              renderItem={RenderMonthsItem as any}
            />
          </Container>
          <AddButton action={onClickAddHandler} />
        </>
      )}
    </>
  );
};

//TODO:
// 1. Carregar boletos do storage
// 2. Colocar na memória os próximos 12 meses
// 3. O objeto salvo na memória deve ser um array com 12 posições, cada posição, um mês
// 4. No objeto deve ter: Nome do mês, ano, array de boletos daquele mês
// 5. Cadas boleto no array deve conter: description, price, status, dueDate
// 6. status deve ser definidio consultado uma tabela que guardará as contas que já foram pagas, se ela não foi paga, verificar se já venceu
// 7. Deve ter uma seta para trocar o mês na página inicial

//TODO:
// IGNORAR HORÁRIO NA GERAÇÃO DOS BOLETOS, PARA EVITAR PROBLEMAS NO FUTURO

export default HomeScreen;
