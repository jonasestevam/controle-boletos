import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

export interface IChangePageBt {
  direction?: 'right' | 'left';
}

export const Container = styled.View`
  flex: 1;
  padding: ${({theme}) => theme.SIZES.medium}px;
  background-color: ${({theme}) => theme.COLORS.darker_black};
`;

export const ButtonChangePage = styled(Icon)<IChangePageBt>`
  font-size: ${({theme, direction}) =>
    direction === 'left' ? theme.SIZES.medium : theme.SIZES.xMedium}px;
  color: ${({theme, direction}) =>
    direction === 'left'
      ? theme.COLORS.white + 'BB'
      : theme.COLORS.white + 'FF'};
`;

export const MonthsList = styled.FlatList`
  height: ${({theme}) => theme.SIZES.screenHeight}px;
  width: ${({theme}) => theme.SIZES.screenWidth}px;
`;
export const MonthsListContainer = styled.View`
  height: ${({theme}) => theme.SIZES.screenHeight}px;
  width: ${({theme}) => theme.SIZES.screenWidth}px;
`;

export const HeaderText = styled.Text`
  font-family: ${({theme}) => theme.FONTS.bold};
  font-size: ${({theme}) => theme.SIZES.large}px;
  color: ${({theme}) => theme.COLORS.white};
`;

export const SubHeaderText = styled.Text`
  font-family: ${({theme}) => theme.FONTS.regular};
  font-size: ${({theme}) => theme.SIZES.small}px;
  margin-top: -${({theme}) => theme.SIZES.xSmall}px;
  color: ${({theme}) => theme.COLORS.white};
`;

export const HeaderContainer = styled.View`
  width: ${({theme}) => theme.SIZES.screenWidth}px;
  padding-top: ${({theme}) => theme.SIZES.large}px;
  flex-direction: row;
  align-items: center;
`;

export const IndicatorsContainer = styled.View`
  width: ${({theme}) => theme.SIZES.screenWidth}px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const BoletosList = styled.FlatList``;
