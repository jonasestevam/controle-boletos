import React from 'react';
import {ViewProps} from 'react-native';
import {
  OptionContainer,
  OptionIcon,
  OptionText,
  StyledOptionContainer,
} from './styles';
import {IMenuOptionProps} from './types';

export const Container = (props: ViewProps) => {
  return <StyledOptionContainer>{props.children}</StyledOptionContainer>;
};

export const Option = (props: IMenuOptionProps) => {
  return (
    <OptionContainer>
      <OptionIcon name={props.icon} />
      <OptionText textColor={props.textColor}>{props.text}</OptionText>
    </OptionContainer>
  );
};
