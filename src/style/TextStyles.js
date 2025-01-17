import { Colors } from '@style';
import { StyleSheet } from 'react-native';

const TextStyles = StyleSheet.create({
  H1: {
    fontFamily: 'Alegreya-Regular',
    color: Colors.offWhite2,
    fontSize: 48,
    lineHeight: 65,
  },
  H2: {
    fontFamily: 'Alegreya-Regular',
    color: Colors.offWhite2,
    fontSize: 28,
    lineHeight: 38,
  },
  H3: {
    fontFamily: 'Alegreya-Regular',
    color: Colors.offWhite2,
    fontSize: 10,
    lineHeight: 65,
  },
  B1: {
    fontFamily: 'Lato-Regular',
    color: Colors.offWhite2,
    fontSize: 18,
    lineHeight: 22,
  },
  B2: {
    fontFamily: 'Lato-Regular',
    color: Colors.offWhite2,
    fontSize: 14,
    lineHeight: 21,
  },
  Button: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '900',
    color: Colors.black2,
  },
});

export default TextStyles;
