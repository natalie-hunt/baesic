import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { BrandButton, BrandTextInput, BrandSlider } from '@components';
import { TextStyles, Colors } from '@style';

const HomeScreen = ({ navigation }) => {
  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  const [myText, setMyText] = useState('');
  const [mySliderValue, setMySliderValue] = useState(0.5);

  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <BrandButton title="Sign Out" onPress={signOut} variant="primary" />
        <BrandTextInput
          label="Label"
          value={myText}
          onChangeValue={setMyText}
          placeholder="My placeholder"
        />
        <BrandSlider
          value={mySliderValue}
          onValueChange={setMySliderValue}
          labels={['First', 'Middle', 'Last']}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.black1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    justifyContent: 'space-around',
  },
});

export default HomeScreen;
