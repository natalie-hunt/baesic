import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@style';

const ProgressIndicator = ({ progress, style }) => {
  // accepts e.g. progress = [true, true, true, false, false];
  const circleRadius = 2;
  const height = progress.length * circleRadius * 2 + progress.length * 4;
  return (
    <View style={[{ justifyContent: 'space-between', height: height }, style]}>
      {progress.map((p, k) => {
        return <Circle key={k} radius={circleRadius} filled={p} />;
      })}
    </View>
  );
};

const Circle = ({ radius, filled }) => {
  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        // borderRadius: radius,
        backgroundColor: filled ? Colors.offWhite1 : Colors.black4,
      }}
    />
  );
};

export default ProgressIndicator;
