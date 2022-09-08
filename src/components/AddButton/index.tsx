import React from 'react';
import {Container, Button} from './styles';
import {TouchableOpacity} from 'react-native';

export interface IAddButton {
  action: Function;
}

const AddButton: React.FC<IAddButton> = ({action}) => {
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          action();
        }}>
        <Button name="plus" />
      </TouchableOpacity>
    </Container>
  );
};

export default AddButton;
