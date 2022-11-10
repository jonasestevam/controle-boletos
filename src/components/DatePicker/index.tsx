import React from 'react';
import {
  AndroidNativeProps,
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import {
  Container,
  DayContainer,
  DayText,
  MonthContainer,
  MonthText,
} from './styles';
import {TouchableOpacity} from 'react-native';

interface IDatePicker {
  onDateChange: (args: Date | undefined) => void;
  value: Date | undefined;
}

export const DatePicker = ({onDateChange, value}: IDatePicker) => {
  const openDatePicker = () => {
    const config: AndroidNativeProps = {
      value: value ? value : new Date(),
      onChange: (event, date) => {
        if (event.type === 'set') {
          onDateChange(date);
        }
      },
    };

    DateTimePickerAndroid.open(config);
  };

  const getDay = (): number | undefined => {
    if (value) {
      return value.getDate();
    }
  };

  const getMonth = (): string | undefined => {
    if (value) {
      return new Date().toLocaleString('default', {month: 'long'});
    }
  };

  return (
    <TouchableOpacity onPress={openDatePicker}>
      <Container>
        <DayContainer>
          <DayText>{getDay()}</DayText>
        </DayContainer>
        <MonthContainer>
          <MonthText>{getMonth()}</MonthText>
        </MonthContainer>
      </Container>
    </TouchableOpacity>
  );
};
