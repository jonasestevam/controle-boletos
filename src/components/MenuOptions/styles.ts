import {TextProps} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import themes from '../../theme';
import {TextColor} from './types';

interface IOptionText extends TextProps {
  textColor?: TextColor;
}

const getTextColor = (textColor?: TextColor): string => {
  switch (textColor) {
    case 'green':
      return themes.COLORS.green;
    case 'red':
      return themes.COLORS.red;
    default:
      return themes.COLORS.white;
  }
};

export const StyledOptionContainer = styled.View`
  background-color: ${({theme}) => theme.COLORS.black};
  border-radius: ${({theme}) => theme.SIZES.small}px;
`;

export const OptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({theme}) => theme.SIZES.small}px;
`;
export const OptionText = styled.Text<IOptionText>`
  color: ${({textColor}) => getTextColor(textColor)};
  font-size: ${({theme}) => theme.SIZES.medium}px;
  font-family: ${({theme}) => theme.FONTS.bold};
`;
export const OptionIcon = styled(Icon)`
  font-size: ${({theme}) => theme.SIZES.xMedium}px;
  margin-right: ${({theme}) => theme.SIZES.medium}px;
  color: ${({theme}) => theme.COLORS.white};
`;
