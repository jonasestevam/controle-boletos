import styled from 'styled-components/native';
import CurrencyInput from 'react-native-currency-input';

export const CurrencyInputText = styled(CurrencyInput)`
  color: white;
  font-size: ${({theme}) => theme.SIZES.xMedium}px;
  width: 100%;
`;

export const InputText = styled.TextInput`
  color: white;
  font-size: ${({theme}) => theme.SIZES.xMedium}px;
  width: 100%;
`;

export const ErrorMessage = styled.Text`
  color: ${({theme}) => theme.COLORS.red};
  font-family: ${({theme}) => theme.FONTS.regular};
`;

export const CurrencyText = styled.Text`
  color: ${({theme}) => theme.COLORS.white};
  font-size: ${({theme}) => theme.SIZES.medium}px;
  margin-top: ${({theme}) => theme.SIZES.xSmall}px;
  margin-right: ${({theme}) => theme.SIZES.xSmall}px;
  font-family: ${({theme}) => theme.FONTS.regular};
`;

export const CurrencyInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
