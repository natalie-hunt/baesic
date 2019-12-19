import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@style';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const ArrowButton = ({ orientation, highlight, onPress, style }) => {
  const arrow = (
    <Icon
      name={orientation === 'up' ? 'chevron-up' : 'chevron-down'}
      size={24}
      color={Colors.offWhite1}
      style={{ marginTop: 3 }}
    />
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: highlight ? Colors.black4 : Colors.black2 },
        style,
      ]}>
      {arrow}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ArrowButton;
