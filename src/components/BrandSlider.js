import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@style';

const BrandSlider = ({ value, onValueChange, labels, style }) => {
  return (
    <View style={style}>
      <Slider
        value={value}
        onValueChange={v => onValueChange(v)}
        thumbTintColor={Colors.offWhite2}
        minimumTrackTintColor={Colors.offWhite1}
        maximumTrackTintColor={Colors.black4}
      />
      <View style={styles.labelContainer}>
        {labels.map((label, k) => (
          <Text key={k} style={styles.label}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: Colors.offWhite2,
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
  },
});

export default BrandSlider;
