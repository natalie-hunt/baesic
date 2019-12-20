import React, { useState , useEffect } from 'react';
import AppleHealthKit from 'rn-apple-healthkit';
import RNCalendarEvents from 'react-native-calendar-events';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { BrandButton, BrandTextInput } from '@components';
import { TextStyles, Colors } from '@style';

const HomeScreen = ({ navigation }) => {

  let [baephone, setBaephone] = useState('');
  let [user, setUser] = useState({});
  let [jwt, setJwt] = useState('');
  const [steps, setSteps] = useState(0);
  const [events, setEvents] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);

  const [goStatus, setGoStatus] = useState('maybe');
  const allCopy = {
    no: {
      gif: require('@assets/images/BaeWatch_NoGo.gif'),
      title: 'No go...',
      subtitle: 'Based on what I know about the two of you, now might not be the best time. Handle each other with care!',
    },
    maybe: {
      gif: require('@assets/images/BaeWatch_Maybe.gif'),
      title: '50% chance.',
      subtitle: 'One of you may be a little down. Try using each other\'s love languages to bring on 100% chance of LOVIN\`!',
    },
    yes: {
      gif: require('@assets/images/BaeWatch_Go.gif'),
      title: 'It\'s on!',
      subtitle: 'Light the candles, dim the lights, put on soft music. Right now I\'m into female singer/songwriters, but you do you.',
    },
  };
  const [copy, setCopy] = useState({});

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
      setBaephone(_user.baephone);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchScore = async () => {
    jwt = await AsyncStorage.getItem('userToken');
    const url = 'http://10.1.10.163:1337/analyses';
    const payload = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt
      }
    };
    try {
      const response = await fetch(url, payload);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      // calculate go / no go
      const youGo = jsonResponse.userScore > 45;
      const baeGo = jsonResponse.baeScore > 45;
      if (youGo && baeGo) {
        setGoStatus('yes');
        setCopy(allCopy.yes);
      } else if (!youGo && !baeGo) {
        setGoStatus('no');
        setCopy(allCopy.no);
      } else {
        setGoStatus('maybe');
        setCopy(allCopy.maybe);
      }
      console.log(goStatus);
    } catch (error) {
      console.log(error);
    }
  }

  const updateUser = async () => {
    connectHealthKit();
    connectCalendars();

    const jwt = await AsyncStorage.getItem('userToken');
    const url = `http://10.1.10.163:1337/users/${user._id}`;
    const payload = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        steps: steps,
        sleep: sleepHours,
        events: events
      }),
    };
    try {
      const response = await fetch(url, payload);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (jsonResponse.confirmed) {
        console.log('success');
        console.log(jsonResponse);
      } else {
        throw Error;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  }
  
  useEffect(() => {
    const doCheck = async () => {
      await checkBaeConfirmation();
      await fetchScore();
      connectCalendars();
      connectHealthKit();
    };
    doCheck();
  }, []);


  const connectHealthKit = () => {
    const PERMS = AppleHealthKit.Constants.Permissions;
    const options = {
      permissions: {
        read: [
          PERMS.StepCount,
          PERMS.SleepAnalysis,
        ],
      },
    };

    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        console.log('error initializing Healthkit: ', err);
        return;
      }

      AppleHealthKit.getStepCount(null, (err, results) => {
        console.log('AppleHealthKit', results);
        if(results) {
          setSteps(results.value);
        }
      });

      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const sleepOptions = {
        startDate: (yesterday).toISOString(),
        endDate: (new Date()).toISOString(),
      };
      AppleHealthKit.getSleepSamples(sleepOptions, (err, results) => {
        if (err) {
          console.log('error reading sleep data: ', err);
          return;
        }

        console.log(results);
      })
    });
  }

  const connectCalendars = () => {
    RNCalendarEvents.authorizationStatus().then(status => {
      console.log('status', status);
      if(status == 'undetermined') {
        RNCalendarEvents.authorizeEventStore().then(u => console.log(u));
      }
      if(status == 'authorized') {
        RNCalendarEvents.fetchAllEvents(new Date(), new Date(), []).then(events => {
          setEvents(events.length);
          console.log('events', events);
        });
      }
    });
  };

  return !user.baeConfirmed ? (
    <View>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.bae}
            source={require('@assets/images/bae.png')}
          />
        </View>
        <Text style={[TextStyles.H1, styles.headerText]}>Waiting on bae</Text>
        <Text style={TextStyles.B1}>Once your bae creates a profile I can be of service.</Text>
        <View style={styles.body}>
          <BrandTextInput
            label="BAE'S CELL PHONE"
            value={baephone}
            onChangeValue={setBaephone}
          />
          <BrandButton title="Send Another Invite" onPress={sendInvite} variant="primary" style={{marginTop: 24}} />
          <BrandButton title="Refresh" onPress={checkBaeConfirmation} variant="secondary" style={{marginTop: 24}}/>
          <BrandButton title="Sign Out" onPress={signOut} variant="secondary" style={{marginTop: 24}}/>
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
            source={copy.gif}
          />
        </View>
        <Text style={[TextStyles.H1, styles.headerText]}>{copy?.title}</Text>
        <Text style={TextStyles.B1}>{copy?.subtitle}</Text>
        <View style={styles.body}>
          <Text style={TextStyles.H2}>My Advice</Text>
          <Text style={TextStyles.B1}>Coming soon...</Text>
        </View>
        <BrandButton title="Refresh" onPress={() => { updateUser(); fetchScore(); }} variant="secondary" style={{marginTop: 64}}/>
        <BrandButton title="Sign Out" onPress={signOut} variant="secondary" style={{marginTop: 24}}/>
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
    width: '100%',
  },
  headerText: {
    marginTop: 8,
  },
  bae: {
    height: 96,
    width: 96,
  },
});

export default HomeScreen;
