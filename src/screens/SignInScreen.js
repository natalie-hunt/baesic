import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StatusBar, Image, StyleSheet, Text } from 'react-native';
import { TextStyles, Colors } from '@style';
import { BrandTextInput, BrandButton } from '@components';

const SignInScreen = ({ navigation }) => {
  const signIn = async () => {
    const url = 'http://10.1.10.163:1337/auth/local';
    const payload = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    };

    try {
      const response = await fetch(url, payload);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const { jwt, user } = jsonResponse;
      await AsyncStorage.setItem('userToken', jwt);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.navigate('Home');
      
    } catch (error) {
      console.log(error);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Image
              style={styles.bae}
              source={require('@assets/images/bae.png')}
            />
            <Text style={[TextStyles.H2, styles.title]}>Sign In</Text>
          </View>
          <View style={styles.formContainer}>
            <BrandTextInput
              label="Email"
              value={email}
              onChangeValue={setEmail}
            />
            <BrandTextInput
              label="Password"
              value={password}
              onChangeValue={setPassword}
              isPassword={true}
            />
          </View>
        </View>
        <View style={styles.c2aContainer}>
          <BrandButton title="LOG IN" variant="primary" onPress={signIn} />
          <BrandButton
            title="I DON'T HAVE AN ACCOUNT"
            variant="secondary"
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.black1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginTop: 64,
  },
  formContainer: {
    marginTop: 88,
    height: 128,
    justifyContent: 'space-between',
  },
  c2aContainer: {
    marginBottom: 48,
    height: 104,
    justifyContent: 'space-between',
    alignContent: 'flex-end',
  },
  bae: {
    height: 64,
    width: 64,
  },
  title: {
    marginTop: 16,
  },
});

export default SignInScreen;
