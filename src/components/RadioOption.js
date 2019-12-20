import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { TextStyles, Colors } from '@style';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const RadioOption = ({ selected, onPress, title, body }) => {
  const icon = (
    <Icon
      size={24}
      color={selected ? Colors.offWhite2 : Colors.black4}
      name={selected ? 'radiobox-marked' : 'radiobox-blank'}
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

export default RadioOption;
