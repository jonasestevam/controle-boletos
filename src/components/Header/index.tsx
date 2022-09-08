import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Container,
  Icon,
  LeftContainer,
  MiddleContainer,
  RightContainer,
} from './styles';

interface IHeader {
  onSavePress: () => void;
  onBackPress: () => void;
}

export const Header = ({onSavePress, onBackPress}: IHeader) => {
  return (
    <Container>
      <TouchableOpacity onPress={onBackPress}>
        <LeftContainer>
          <Icon name="arrowleft" />
        </LeftContainer>
      </TouchableOpacity>
      <MiddleContainer></MiddleContainer>
      <TouchableOpacity onPress={onSavePress}>
        <RightContainer>
          <Icon name="save" />
        </RightContainer>
      </TouchableOpacity>
    </Container>
  );
};
