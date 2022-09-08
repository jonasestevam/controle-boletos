import React from 'react';
import {Control, Controller, FieldError} from 'react-hook-form';
import {TextInputProps} from 'react-native';
import {
  CurrencyInputContainer,
  CurrencyInputText,
  CurrencyText,
  ErrorMessage,
  InputText,
} from './styles';

export type ControlledInputProps = TextInputProps & {
  currency?: boolean;
  value?: string;
  forwardedRef?: any;
  control: Control<any>;
  name: string;
  error?: FieldError;
};

export const ControlledTextInput = ({
  control,
  forwardedRef,
  name,
  currency,
  error,
  ...rest
}: ControlledInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}}) => {
        return (
          <>
            {currency ? (
              <CurrencyInputContainer>
                <CurrencyText>R$</CurrencyText>
                <CurrencyInputText
                  ref={forwardedRef}
                  value={value || 0}
                  onChangeValue={text => {
                    onChange(text);
                  }}
                  selectionColor={'red'}
                  {...rest}
                />
              </CurrencyInputContainer>
            ) : (
              <InputText
                ref={forwardedRef}
                onChangeText={onChange}
                value={value}
                {...rest}
              />
            )}
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </>
        );
      }}
    />
  );
};
