import React, { useState , useEffect, forceUpdate } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { BrandButton, BrandTextInput, BrandSlider } from '@components';
import { TextStyles, Colors } from '@style';

const HomeScreen = ({ navigation }) => {

  let [baephone, updateBaephone] = useState('');
  let [user, setUser] = useState({});
  let [jwt, setJwt] = useState('');

  const sendInvite = async () => {
    const _jwt = await AsyncStorage.getItem('userToken');
    setJwt(_jwt);
    const url = 'http://10.1.10.163:1337/users/' + user._id;
    const payload = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + _jwt
      },
      body: JSON.stringify({ baephone})
    };

    try {
      const response = await fetch(url, payload);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const checkBaeConfirmation = async () => {
    jwt = await AsyncStorage.getItem('userToken');
    const url = 'http://10.1.10.163:1337/users/me';
    const payload = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt
      }
    };

    try {
      const response = await fetch(url, payload);
      const _user = await response.json();
      setUser(_user);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log(user);
    } catch (error) {
      console.log(error);
    }

  };

  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  }
  
  useEffect(() => {
    const doCheck = async () => {
      await checkBaeConfirmation();
    };
    doCheck();
  }, []);

    return !user.baeconfirmed ? (
      <View>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.bae}
              source={require('@assets/images/bae.png')}
            />
          </View>
          <Text style={[TextStyles.H2, styles.headerText]}>Waiting on bae</Text>
          <Text style={styles.subText}>Once your bae creates a profile I can be of service.</Text>
          <View style={styles.body}>
            <BrandTextInput
              label="BAE'S CELL PHONE"
              value={baephone}
              onChangeValue={updateBaephone}
            />
            <BrandButton title="Send Another Invite" onPress={sendInvite} variant="primary" />
            <BrandButton title="Refresh" onPress={checkBaeConfirmation} variant="primary" />
            <BrandButton title="Sign Out" onPress={signOut} variant="primary" />
            <Text style={styles.subText}>Scratch That. Try A Different Number</Text>
          </View>
        </View>
      </View>
    ) : (
      <View>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.bae}
              source={require('@assets/images/bae.png')}
            />
          </View>
          <Text style={[TextStyles.H2, styles.headerText]}>No go...</Text>
          <Text style={styles.subText}>Based on what I know about the two of you, now might not be the best time..</Text>
          <View style={styles.body}>
            <Text style={styles.subText}>My Advice</Text>
            <Text style={styles.subText}>Coming soon...</Text>
          </View>
        </View>
      </View>
    )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.black1,
    paddingHorizontal: 24,
    paddingTop:74,
    justifyContent: 'flex-start',
  },
  body: {
    marginTop: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
  },
  headerText: {
    marginTop: 80,
    fontSize: 48,
    lineHeight: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    marginTop: 20,
    color: Colors.offWhite2,
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bae: {
    height: 64,
    width: 64,
  },
});

export default HomeScreen;
