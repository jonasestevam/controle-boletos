import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {IIndicator} from './IIndicator';

export const Container = styled.View<IIndicator>`
  padding-left: ${({theme}) => theme.SIZES.small}px;
  margin-top: ${({theme}) => theme.SIZES.medium}px;
  margin-bottom: ${({theme}) => theme.SIZES.large}px;
  flex-direction: row;
  width: 50%;
`;
export const ArrowContainer = styled.View<IIndicator>`
  padding: ${({theme}) => theme.SIZES.xSmall}px;
  border-radius: ${({theme}) => theme.SIZES.small}px;
  border-color: ${({theme, type}) =>
    type === 'income' ? theme.COLORS.green : theme.COLORS.red};
  border-width: 1px;
`;

export const Arrow = styled(Icon)<IIndicator>`
  font-size: ${({theme}) => theme.SIZES.large}px;
  color: ${({theme, type}) =>
    type === 'income' ? theme.COLORS.green : theme.COLORS.red};
`;

export const AmountText = styled.Text`
  font-size: ${({theme}) => theme.SIZES.medium}px;
  font-family: ${({theme}) => theme.FONTS.bold};
  margin-left: ${({theme}) => theme.SIZES.small}px;
  color: ${({theme}) => theme.COLORS.white};
  flex-shrink: 1;
`;

export const TypeText = styled.Text`
  font-size: ${({theme}) => theme.SIZES.small}px;
  font-family: ${({theme}) => theme.FONTS.regular};
  margin-left: ${({theme}) => theme.SIZES.small}px;
  color: ${({theme}) => theme.COLORS.white};
`;

export const SubContainer = styled.View`
  width: 100%;
  flex-shrink: 1;
`;
