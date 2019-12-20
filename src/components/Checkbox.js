import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { TextStyles, Colors } from '@style';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// const CheckboxArray = ({ options, style }) => {
//   return (
//     <View style={style}>
//       {options.map((option, k) => {
//         return (
//           <CheckboxOption
//             key={k}
//             checked={option.checked}
//             // setSelected={option.setSelected}
//             title={option.title}
//             body={option.body
//           />
//         );
//       })}
//     </View>
//   );
// };

const Checkbox = ({ checked = false, onPress, title, body }) => {
  const icon = (
    <Icon
      size={24}
      color={checked ? Colors.offWhite2 : Colors.black4}
      name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
    />
  );
  return (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      {icon}
      <View style={{ marginLeft: 8, marginRight: 24 }}>
        <Text style={TextStyles.B1}>{title}</Text>
        <Text style={[TextStyles.B2, { color: Colors.black4 }]}>{body}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    marginBottom: 16,
    flexDirection: 'row',
  },
});

export default Checkbox;
