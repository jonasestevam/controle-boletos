import {
  heightPercentageToDP as heightDP,
  widthPercentageToDP as widthDP,
} from 'react-native-responsive-screen';

export default {
  COLORS: {
    white: '#ffffff',
    red: '#CC444B',
    pink: '#EBBCBC',
    black: '#1E1E21',
    darker_black: '#1B1B1E',
    green: '#06D6A0',
  },
  FONTS: {
    thin: 'Poppins-Thin',
    regular: 'Poppins-Regular',
    bold: 'Poppins-Bold',
  },
  SIZES: {
    xSmall: heightDP(1),
    small: heightDP(1.5),
    medium: heightDP(2),
    xMedium: heightDP(3),
    large: heightDP(5),
    xLarge: heightDP(7),
    screenWidth: widthDP(100),
    screenHeight: heightDP(100),
  },
};
