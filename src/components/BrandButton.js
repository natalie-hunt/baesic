import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextStyles, Colors } from '@style';

const BrandButton = ({ title, onPress, variant, style }) => {
  const getVariantColorScheme = variant => {
    if (variant === 'primary') {
      return {
        backgroundColor: Colors.cream,
        textColor: Colors.black,
      };
    } else if (variant === 'secondary') {
      return {
        backgroundColor: Colors.black,
        textColor: Colors.gray,
      };
    } else if (variant === 'tertiary') {
      return {
        backgroundColor: Colors.gray,
        textColor: Colors.tan,
      };
    } else {
      return {
        backgroundColor: Colors.cream,
        textColor: Colors.black,
      };
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: getVariantColorScheme(variant).backgroundColor },
        style,
      ]}>
      <Text
        style={[
          TextStyles.Button,
          { color: getVariantColorScheme(variant).textColor },
        ]}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cream,
    padding: 16,
    alignItems: 'center',
    borderRadius: 4,
  },
});

export default BrandButton;
