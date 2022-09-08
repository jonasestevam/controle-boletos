import AntIcon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.COLORS.darker_black};
  padding: ${({theme}) => theme.SIZES.small}px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Icon = styled(AntIcon)`
  color: ${({theme}) => theme.COLORS.white};
  font-size: ${({theme}) => theme.SIZES.xMedium}px;
  padding: ${({theme}) => theme.SIZES.small}px;
`;

export const LeftContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export const MiddleContainer = styled.View``;

export const RightContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
