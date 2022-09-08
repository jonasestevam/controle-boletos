import React from 'react';
import {TouchableOpacity} from 'react-native';
import {CheckButton, CheckText} from './styles';

type TCheckBox = {
  text: string;
  selected: boolean;
  onPress: Function;
};

export const Checkbox = ({text, selected, onPress}: TCheckBox) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <CheckButton selected={selected}>
        <CheckText selected={selected}>{text}</CheckText>
      </CheckButton>
    </TouchableOpacity>
  );
};
