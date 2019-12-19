import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextStyles, Colors } from '@style';

const BrandButton = ({ title, onPress, variant, style }) => {
  const getVariantColorScheme = variant => {
    if (variant === 'primary') {
      return {
        backgroundColor: Colors.offWhite2,
        textColor: Colors.black2,
      };
    } else if (variant === 'secondary') {
      return {
        backgroundColor: Colors.black1,
        textColor: Colors.black4,
      };
    } else if (variant === 'tertiary') {
      return {
        backgroundColor: Colors.offWhite1,
        textColor: Colors.black3,
      };
    } else {
      return {
        backgroundColor: Colors.offWhite2,
        textColor: Colors.black2,
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
