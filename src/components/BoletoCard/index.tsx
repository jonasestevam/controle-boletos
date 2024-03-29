import React, {useState} from 'react';
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
import {IBoleto, TStatusBoletos} from '../../models/boleto.model';
import {
  getBoletoStatus,
  setAsPaid,
  unsetAsPaid,
  useStoreBoletos,
} from '../../services/BoletosService';
import theme from '../../theme';
import currencyFormat from '../../utils/currencyFormat';
import {Container as MenuContainer, Option} from '../MenuOptions';
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
import {useNavigation} from '@react-navigation/native';

interface IBoletoCard {
  boleto: IBoleto;
}

const getStatusText = (status: TStatusBoletos | undefined): string => {
  switch (status) {
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

const setPaid = async (boleto: IBoleto) => {
  await setAsPaid(boleto);
  Toast.show({
    type: 'success',
    text1: 'Uhull!',
    text2: 'Boleto pago! ✅ ',
    visibilityTime: 4500,
  });
};
const unsetPaid = async (boleto: IBoleto) => {
  await unsetAsPaid(boleto);
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
  const [status, setStatus] = useState<TStatusBoletos | undefined>(
    boleto.status,
  );

  const navigation = useNavigation();
  const deleteBoleto = useStoreBoletos(state => state.delete);

  const onClickEditHandler = (boleto: IBoleto) => {
    navigation.navigate('AddBoleto', {
      boletoToEdit: {
        ...boleto,
        dueDate: boleto.dueDate.toISOString(),
      },
    });
  };
  const onClickDeleteHandler = (idBoleto: string) => {
    deleteBoleto(idBoleto);
  };

  return (
    <Menu>
      <MenuTrigger
        triggerOnLongPress={true}
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
          triggerWrapper: cardStyle,
        }}>
        <Status status={status}>
          <StatusText>{getStatusText(status)}</StatusText>
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
        {status === 'PAID' ? (
          <>
            <MenuOption
              onSelect={() => {
                setStatus(getBoletoStatus(boleto));
                unsetPaid(boleto);
              }}>
              <MenuContainer>
                <Option icon="close" textColor="red" text="Unmark as paid" />
              </MenuContainer>
            </MenuOption>
          </>
        ) : (
          <>
            <MenuOption
              onSelect={() => {
                setStatus('PAID');
                setPaid(boleto);
              }}>
              <MenuContainer>
                <Option icon="check" textColor="green" text="Pay" />
              </MenuContainer>
            </MenuOption>
          </>
        )}

        <MenuOption
          onSelect={() => {
            onClickEditHandler(boleto);
          }}>
          <MenuContainer>
            <Option icon="edit" textColor="white" text="Edit" />
          </MenuContainer>
        </MenuOption>

        <MenuOption
          onSelect={() => {
            onClickDeleteHandler(boleto.id);
          }}>
          <MenuContainer>
            <Option icon="delete" textColor="red" text="Delete" />
          </MenuContainer>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default BoletoCard;
