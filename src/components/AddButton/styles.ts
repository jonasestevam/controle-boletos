import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

export const Container = styled.View`
  position: absolute;
  width: 100%;
  top: 0;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const Button = styled(Icon)`
  font-size: ${({theme}) => theme.SIZES.large}px;
  color: ${({theme}) => theme.COLORS.white};
  padding: ${({theme}) => theme.SIZES.small}px;
  background-color: ${({theme}) => theme.COLORS.black};
  border-radius: ${({theme}) => theme.SIZES.large}px;
  margin-top: ${({theme}) => theme.SIZES.small}px;
  margin-right: ${({theme}) => theme.SIZES.small}px;
`;
