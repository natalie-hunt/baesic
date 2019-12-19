import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet, StatusBar } from 'react-native';
import { BrandButton, BrandTextInput } from '@components';
import { Colors } from '@style';

const HomeScreen = ({ navigation }) => {
  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  const [myText, setMyText] = useState('');

  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <BrandButton title="Sign Out" onPress={signOut} variant="primary" />
        <BrandTextInput
          label="Label"
          input={myText}
          setInput={setMyText}
          placeholder="My placeholder"
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
