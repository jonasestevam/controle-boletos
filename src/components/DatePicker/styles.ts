import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.COLORS.black};
  padding: ${({theme}) => theme.SIZES.xSmall}px;
  border-radius: ${({theme}) => theme.SIZES.small}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DayContainer = styled.View`
  width: 50%;
  padding: ${({theme}) => theme.SIZES.small}px;
  align-items: center;
  border-right-color: ${({theme}) => theme.COLORS.darker_black};
  border-right-width: 1px;
`;

export const MonthContainer = styled.View`
  width: 50%;
  padding: ${({theme}) => theme.SIZES.small}px;
  align-items: center;
  border-left-color: ${({theme}) => theme.COLORS.darker_black};
  border-left-width: 1px;
`;

export const MonthText = styled.Text`
  font-family: ${({theme}) => theme.FONTS.bold};
  font-size: ${({theme}) => theme.SIZES.medium}px;
  color: ${({theme}) => theme.COLORS.white};
`;

export const DayText = styled.Text`
  font-family: ${({theme}) => theme.FONTS.bold};
  font-size: ${({theme}) => theme.SIZES.medium}px;
  color: ${({theme}) => theme.COLORS.white};
`;
