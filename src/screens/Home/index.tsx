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
  HeaderTextContainer,
  IndicatorsContainer,
  MonthsList,
  MonthsListContainer,
  SubHeaderText,
} from './styles';

const HomeScreen = ({navigation}: any) => {
  const [isLoading] = useState(false);
  const [months, setMonths] = useState<IMonth[]>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);

  const loadBoletos = useStoreBoletos(state => state.load);
  const boletos = useStoreBoletos(state => state.boletos);

  const RenderBoletos: ListRenderItem<any> = ({item}) => (
    <BoletoCard boleto={item} />
  );

  const onScrollEnd = (event: any) => {
    if (event.nativeEvent) {
      let contentOffset = event.nativeEvent.contentOffset;
      let viewSize = event.nativeEvent.layoutMeasurement;
      let pageNum = Math.floor(contentOffset.x / viewSize.width);
      setCurrentPageNumber(pageNum);
    }
  };

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
          {currentPageNumber !== 0 && (
            <ButtonChangePage name="caretleft" direction="left" />
          )}
          <HeaderTextContainer>
            <HeaderText>{item.name}</HeaderText>
            <SubHeaderText>{item.year}</SubHeaderText>
          </HeaderTextContainer>
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
              onMomentumScrollEnd={onScrollEnd}
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

export default HomeScreen;
