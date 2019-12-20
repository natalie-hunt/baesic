import React, { useState } from 'react';
import { View, StatusBar, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextStyles, Colors } from '@style';
import { BrandTextInput, BrandButton } from '@components';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    const url = 'http://10.1.10.163:1337/auth/local/register';
    const payload = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        phone: number,
        name: name,
        address: address,
      }),
    };

    try {
      const response = await fetch(url, payload);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const { jwt, user } = jsonResponse;
      if (user?.confirmed) {
        await AsyncStorage.setItem('userToken', jwt);
        navigation.navigate('Onboarding');
      } else {
        throw Error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image
            style={styles.bae}
            source={require('@assets/images/bae.png')}
          />
          <Text style={[TextStyles.H2, styles.title]}>Sign Me Up!</Text>
        </View>
        <View style={styles.formContainer}>
          <BrandTextInput label="Name" value={name} onChangeValue={setName} />
          <BrandTextInput
            label="Cell"
            value={number}
            onChangeValue={setNumber}
          />
          <BrandTextInput
            label="Address"
            value={address}
            onChangeValue={setAddress}
          />
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
        <View style={styles.c2aContainer}>
          <BrandButton
            title="Let's Get It"
            variant="primary"
            onPress={signUp}
          />
          <BrandButton
            title="I ALREADY HAVE AN ACCOUNT"
            variant="secondary"
            onPress={() => navigation.navigate('SignIn')}
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
    height: 352,
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

export default SignUpScreen;
