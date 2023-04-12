import React, {useEffect, useState} from 'react';
import {ListRenderItem, TouchableOpacity} from 'react-native';
import AddButton from '../../components/AddButton';
import BoletoCard from '../../components/BoletoCard';
import Indicator from '../../components/Indicator';
import {IMonth} from '../../models/boleto.model';
import {buildTheYear, useStoreBoletos} from '../../services/BoletosService';
import {
  BoletosList,
  ButtonChangePage,
  Container,
  EmptyListAddButton,
  HeaderContainer,
  HeaderText,
  HeaderTextContainer,
  IndicatorsContainer,
  MonthsList,
  MonthsListContainer,
  NoDataIconContainer,
  NoDataText,
  SubHeaderText,
} from './styles';

import NoDataSVG from '../../assets/illustrations/no_data.svg';

const HomeScreen = ({navigation}: any) => {
  const [isLoading] = useState(false);
  const [months, setMonths] = useState<IMonth[]>();
  // const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);

  const loadBoletos = useStoreBoletos(state => state.load);
  const boletos = useStoreBoletos(state => state.boletos);

  const RenderBoletos: ListRenderItem<any> = ({item}) => {
    return <BoletoCard boleto={item} />;
  };

  // const onScrollEnd = (event: any) => {
  //   if (event.nativeEvent) {
  //     let contentOffset = event.nativeEvent.contentOffset;
  //     let viewSize = event.nativeEvent.layoutMeasurement;
  //     let pageNum = Math.floor(contentOffset.x / viewSize.width);
  //     currentPageNumber = pageNum;
  //   }
  // };

  const onClickAddHandler = (month: number, year: string) => {
    navigation.navigate('AddBoleto', {month, year});
  };

  useEffect(() => {
    (async () => {
      await loadBoletos();
    })();
  }, [loadBoletos]);

  useEffect(() => {
    (async () => {
      if (boletos) {
        boletos.sort(
          (a, b) =>
            new Date(a.dueDate).getDate() - new Date(b.dueDate).getDate(),
        );

        setMonths(await buildTheYear(boletos));
      }
    })();
  }, [boletos]);

  const RenderMonthsItem: ListRenderItem<IMonth> = ({item, index}) => {
    return (
      <MonthsListContainer>
        <HeaderContainer>
          {index !== 0 && (
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
        {item.boletos?.length ? (
          <BoletosList data={item.boletos} renderItem={RenderBoletos} />
        ) : (
          <>
            <NoDataIconContainer>
              <NoDataSVG width={150} height={150} />
              <NoDataText>Adicionar uma nova conta</NoDataText>
              <TouchableOpacity
                onPress={() => {
                  onClickAddHandler(item.index, item.year);
                }}>
                <EmptyListAddButton name="plus" />
              </TouchableOpacity>
            </NoDataIconContainer>
          </>
        )}
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

export default HomeScreen;
