import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  return (
    <View>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default HomeScreen;
