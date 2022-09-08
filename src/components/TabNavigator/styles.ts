import styled from 'styled-components/native';

export const Container = styled.View`
  padding-top: ${({theme}) => theme.SIZES.xSmall}px;
  background-color: ${({theme}) => theme.COLORS.darker_black};
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const TabTitle = styled.Text`
  font-family: ${({theme}) => theme.FONTS.thin};
  font-size: ${({theme}) => theme.SIZES.small}px;
  color: ${({theme}) => theme.COLORS.white};
`;

export const TabTitleContainer = styled.View``;

export const TabMarker = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: ${({theme}) => theme.COLORS.white};
`;
