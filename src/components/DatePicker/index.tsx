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
import getMonthNameByNumber from '../../utils/getMonthNameByNumber';
import {translate} from '../../i18n/locales';

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
      return translate(getMonthNameByNumber(value.getMonth() + 1));
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
