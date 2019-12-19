import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { Colors } from '@style';

const BrandTextInput = ({
  label,
  value,
  onChangeValue,
  isPassword = false,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const shouldShowLabel = () => {
    return isFocused || value !== '';
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={20}
      style={[styles.container, style]}>
      <Text style={[styles.label, isFocused ? styles.highlight : null]}>
        {shouldShowLabel() ? label.toUpperCase() : ''}
      </Text>
      <TextInput
        style={[styles.input, isFocused ? styles.highlight : null]}
        onChangeText={onChangeValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        placeholder={label}
        placeholderTextColor={Colors.black4}
        selectionColor={Colors.offWhite2}
        secureTextEntry={isPassword}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black4,
    color: Colors.offWhite1,
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    paddingTop: 5,
    paddingBottom: 8,
  },
  highlight: {
    borderBottomColor: Colors.offWhite2,
    color: Colors.offWhite2,
  },
  label: {
    color: Colors.black4,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 12,
  },
});

export default BrandTextInput;
