import styled from 'styled-components/native';
import themeRoot from '../../theme';
import { TStatusBoletos } from '../../models/boleto.model';

interface IBoletoStatus {
  status?: TStatusBoletos;
}

const getStatusColor = (status: TStatusBoletos | undefined): string => {
  switch (status) {
    case 'LATE':
      return themeRoot.COLORS.red;
    case 'PAID':
      return themeRoot.COLORS.green;
    case 'TO_BE_PAID':
      return themeRoot.COLORS.pink;
    default:
      return themeRoot.COLORS.pink;
  }
};

export const DueDateContainer = styled.View`
  height: ${({theme}) => theme.SIZES.large}px;
  width: ${({theme}) => theme.SIZES.large}px;
  border-radius: ${({theme}) => theme.SIZES.small}px;
  justify-content: center;
  align-items: center;
`;

export const DueDate = styled.Text`
  font-size: ${({theme}) => theme.SIZES.xMedium}px;
  font-family: ${({theme}) => theme.FONTS.bold};
  color: ${({theme}) => theme.COLORS.white};
`;

export const DescriptionDueDateContainer = styled.View`
  width: 70%;
  flex-shrink: 1;
  padding-left: ${({theme}) => theme.SIZES.small}px;
`;

export const AmountContainer = styled.View`
  width: 50%;
  flex-shrink: 1;
  align-items: center;
  justify-content: center;
`;

export const DescriptionText = styled.Text`
  font-size: ${({theme}) => theme.SIZES.medium}px;
  font-family: ${({theme}) => theme.FONTS.regular};
  color: ${({theme}) => theme.COLORS.white};
`;

export const Status = styled.View<IBoletoStatus>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({theme}) => theme.SIZES.xLarge + 30}px;
  height: ${({theme}) => theme.SIZES.xMedium}px;
  background-color: ${({status}) => getStatusColor(status)};
  border-top-right-radius: ${({theme}) => theme.SIZES.small}px;
  border-bottom-left-radius: ${({theme}) => theme.SIZES.small}px;
  justify-content: center;
  align-items: center;
`;

export const StatusText = styled.Text`
  font-size: ${({theme}) => theme.SIZES.small}px;
  font-family: ${({theme}) => theme.FONTS.regular};
  color: ${({theme}) => theme.COLORS.black};
`;

export const AmountText = styled.Text`
  font-size: ${({theme}) => theme.SIZES.medium}px;
  font-family: ${({theme}) => theme.FONTS.bold};
  color: ${({theme}) => theme.COLORS.white};
`;

export const MenuOptionsContainer = styled.View`
  background-color: ${({theme}) => theme.COLORS.black};
`;

export const PayOptionText = styled.Text`
  background-color: ${({theme}) => theme.COLORS.black};
  font-size: ${({theme}) => theme.SIZES.xMedium}px;
  font-family: ${({theme}) => theme.FONTS.bold};
  color: ${({theme}) => theme.COLORS.green};
  padding: ${({theme}) => theme.SIZES.medium}px;
`;

export const DeleteOptionText = styled.Text`
  background-color: ${({theme}) => theme.COLORS.black};
  font-size: ${({theme}) => theme.SIZES.small}px;
  font-family: ${({theme}) => theme.FONTS.regular};
  color: ${({theme}) => theme.COLORS.red};
  padding: ${({theme}) => theme.SIZES.medium}px;
`;
