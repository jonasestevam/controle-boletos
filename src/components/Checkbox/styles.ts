import styled from 'styled-components/native';

interface ICheckButton {
  selected: boolean | undefined;
}

export const CheckButton = styled.View<ICheckButton>`
  width: 70%;
  margin-top: ${({theme}) => theme.SIZES.xMedium}px;
  height: ${({theme}) => theme.SIZES.xLarge}px;
  background-color: ${({theme, selected}) =>
    selected ? theme.COLORS.green : theme.COLORS.black};
  align-self: center;
  border-radius: ${({theme}) => theme.SIZES.small}px;
  align-items: center;
  justify-content: center;
`;

interface ICheckText {
  selected: boolean | undefined;
}

export const CheckText = styled.Text<ICheckText>`
  font-family: ${({theme}) => theme.FONTS.regular};
  font-size: ${({theme}) => theme.SIZES.medium}px;
  color: ${({theme, selected}) =>
    selected ? theme.COLORS.black : theme.COLORS.white};
`;

export const PeriodContainer = styled.View`
  margin-top: ${({theme}) => theme.SIZES.xLarge + 50}px;
`;
