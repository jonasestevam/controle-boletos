import styled from 'styled-components/native';
import PagerView from 'react-native-pager-view';

export const Container = styled(PagerView)`
  flex: 1;
  padding: ${({theme}) => theme.SIZES.medium}px;
  background-color: ${({theme}) => theme.COLORS.darker_black};
`;

export const StepContainer = styled.View`
  padding: ${({theme}) => theme.SIZES.medium}px;
  background-color: ${({theme}) => theme.COLORS.darker_black};
  height: 100%;
  width: 100%;
`;

export const InputContainer = styled.View`
  border-radius: ${({theme}) => theme.SIZES.small}px;
  padding: ${({theme}) => theme.SIZES.medium}px;
  background-color: ${({theme}) => theme.COLORS.black};
  margin-top: ${({theme}) => theme.SIZES.large}px;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const CheckboxContainer = styled.View`
  border-radius: ${({theme}) => theme.SIZES.small}px;
  padding: ${({theme}) => theme.SIZES.medium}px;
  background-color: ${({theme}) => theme.COLORS.black};
  margin-top: ${({theme}) => theme.SIZES.xLarge}px;
  width: 100%;
  justify-content: flex-start;
`;

export const Text = styled.Text`
  color: ${({theme}) => theme.COLORS.white};
  font-size: ${({theme}) => theme.SIZES.xMedium}px;
  font-family: ${({theme}) => theme.FONTS.bold};
  margin-top: ${({theme}) => theme.SIZES.xMedium}px;
`;
