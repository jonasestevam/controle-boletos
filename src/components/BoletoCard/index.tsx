import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import {translate} from '../../i18n/locales';
import IBoleto from '../../models/boleto.model';
import theme from '../../theme';
import currencyFormat from '../../utils/currencyFormat';
import {Option, Container as MenuContainer} from '../MenuOptions';
import {
  AmountContainer,
  AmountText,
  DescriptionDueDateContainer,
  DescriptionText,
  DueDate,
  DueDateContainer,
  Status,
  StatusText,
} from './styles';

interface IBoletoCard {
  boleto: IBoleto;
}

const getStatusText = (boleto: IBoleto): string => {
  switch (boleto.status) {
    case 'LATE':
      return translate('LATE_BOLETO_TEXT');
    case 'PAID':
      return translate('PAID_BOLETO_TEXT');
    case 'TO_BE_PAID':
      return translate('TO_BE_PAID_BOLETO_TEXT');
    default:
      return '';
  }
};

const setAsPaid = () => {
  Toast.show({
    type: 'success',
    text1: 'Uhull!',
    text2: 'Boleto pago! ✅ ',
    visibilityTime: 4500,
  });
};

const cardStyle: StyleProp<ViewStyle> = {
  marginBottom: theme.SIZES.small,
  backgroundColor: theme.COLORS.black,
  padding: theme.SIZES.xMedium,
  borderRadius: theme.SIZES.small,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: widthPercentageToDP(92),
};

const BoletoCard = ({boleto}: IBoletoCard) => {
  return (
    <Menu>
      <MenuTrigger
        triggerOnLongPress={true}
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
          triggerWrapper: cardStyle,
        }}>
        <Status status={boleto.status}>
          <StatusText>{getStatusText(boleto)}</StatusText>
        </Status>
        <DueDateContainer>
          <DueDate>{new Date(boleto.dueDate as Date).getDate()}</DueDate>
        </DueDateContainer>
        <DescriptionDueDateContainer>
          <DescriptionText>{boleto.description}</DescriptionText>
        </DescriptionDueDateContainer>
        <AmountContainer>
          <AmountText>{currencyFormat(Number(boleto.price))}</AmountText>
        </AmountContainer>
      </MenuTrigger>

      <MenuOptions
        optionsContainerStyle={{
          backgroundColor: theme.COLORS.black,
          borderRadius: theme.SIZES.small,
        }}>
        <MenuOption onSelect={setAsPaid}>
          <MenuContainer>
            <Option icon="check" textColor="green" text="Pay" />
          </MenuContainer>
        </MenuOption>

        <MenuOption>
          <MenuContainer>
            <Option icon="edit" textColor="white" text="Edit" />
          </MenuContainer>
        </MenuOption>

        <MenuOption>
          <MenuContainer>
            <Option icon="delete" textColor="red" text="Delete" />
          </MenuContainer>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default BoletoCard;
