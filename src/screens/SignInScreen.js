import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, View } from 'react-native';

const SignInScreen = ({ navigation }) => {
  const signIn = async () => {
    await AsyncStorage.setItem('userToken', 'signed in');
    navigation.navigate('Onboarding');
  };

  return (
    <View>
      <Button title="Sign In" onPress={signIn} />
    </View>
  );
};

export default SignInScreen;
