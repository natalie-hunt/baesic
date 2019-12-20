import React, { useState, useReducer, useEffect } from 'react';
import AppleHealthKit from 'rn-apple-healthkit';
import RNCalendarEvents from 'react-native-calendar-events';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  AsyncStorage,
  KeyboardAvoidingView,
} from 'react-native';
import { TextStyles, Colors } from '@style';
import {
  ProgressIndicator,
  ArrowButton,
  BrandSlider,
  RadioOption,
  Checkbox,
} from '@components';
import { BrandTextInput, BrandButton } from '../components';

const OnboardingScreen = ({ navigation }) => {
  const name = navigation.getParam('name');
  const initialUserData = navigation.getParam('user');

  const [loveLanguages, setLoveLanguages] = useState([]);
  useEffect(() => {
    const fetchLangauges = async () => {
      const jwt = await AsyncStorage.getItem('userToken');
      const url = 'http://10.1.10.163:1337/languages';
      const payload = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      };
      try {
        const response = await fetch(url, payload);
        const jsonResponse = await response.json();
        setLoveLanguages(
          jsonResponse.map(language => {
            return {
              ...language,
              selected: false,
            };
          }),
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchLangauges();
  }, []);

  const [userWasInvited, setUserWasInvited] = useState(undefined);
  const [baeConfirmed, setBaeConfirmed] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      const jwt = await AsyncStorage.getItem('userToken');
      const url = 'http://10.1.10.163:1337/users';
      const payload = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      };
      try {
        const response = await fetch(url, payload);
        const jsonResponse = await response.json();
        console.log('users: ', jsonResponse);
        console.log('initial user data: ', initialUserData);
        const inviters = jsonResponse.filter(
          u => u.baephone === initialUserData.phone,
        );
        if (inviters.length > 0) {
          setBaephone(inviters[0].phone);
          setBaeConfirmed(true);
          setUserWasInvited(true);
        } else {
          setUserWasInvited(false);
          setBaeConfirmed(false);
        }
      } catch (error) {
        setUserWasInvited(false);
        console.log(error);
      }
      console.log('invited: ', userWasInvited);
      console.log('baephone: ', baephone);
    };

    fetchUsers();
  }, []);

  const [steps, setSteps] = useState(0);
  const [events, setEvents] = useState(0);
  const [sleepHours, setSleepHours] = useState(0);

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
        const start = new Date();
        start.setHours(0,0,0,0);
        const end = new Date();
        end.setHours(23,59,59,999);
        console.log('start', start);
        console.log('end', end);
        RNCalendarEvents.fetchAllEvents(start, end, []).then(_events => {
          setEvents(_events.length);
          console.log('events', events);
        });
      }
    });
  };


  const [busyAnswer, setBusyAnswer] = useState(0);
  const [activityAnswer, setActivityAnswer] = useState(0);
  const [checkedItems, setCheckedItems] = useState({
    location: false,
    health: false,
    calendar: false,
  });
  const [twitterHandle, setTwitterHandle] = useState('');
  const [baephone, setBaephone] = useState('');

  let questions = [
    {
      progressIndicatorStep: [true, false, false, false, false],
      render: (
        <View>
          <Text style={TextStyles.H2}>Hi {name}!</Text>
          <Text style={TextStyles.H2}>
            I'll get to know you better over time, but since we're just meeting
            I'd like to ask you a few questions...
          </Text>
        </View>
      ),
    },
    {
      progressIndicatorStep: [true, false, false, false, false],
      render: (
        <View style={styles.sliderQuestionContainer}>
          <Text style={TextStyles.H2}>
            If you've had a busy day, do you still feel like getting it on?
          </Text>
          <BrandSlider
            value={busyAnswer}
            onValueChange={setBusyAnswer}
            labels={['No way', "Doesn't matter", 'Yup']}
          />
        </View>
      ),
    },
    {
      progressIndicatorStep: [false, true, false, false, false],
      render: (
        <View style={styles.sliderQuestionContainer}>
          <Text style={TextStyles.H2}>
            If you've gotten some exercise that day, are you still ready to get
            frisky?
          </Text>
          <BrandSlider
            value={activityAnswer}
            onValueChange={setActivityAnswer}
            labels={['Nah, too tired', "Doesn't matter", 'Definitely']}
          />
        </View>
      ),
    },
    {
      progressIndicatorStep: [false, false, true, false, false],
      render: loveLanguages ? (
        <View>
          <Text style={TextStyles.H2}>
            Now, pick your primary love language:
          </Text>
          <View style={{ marginTop: 40 }}>
            {loveLanguages.map((language, k) => {
              return (
                <RadioOption
                  key={language.id}
                  title={language.title}
                  body={language.description}
                  selected={language.selected}
                  onPress={() => {
                    setLoveLanguages(
                      loveLanguages.map(l => {
                        let value = { ...l };
                        if (l.id === language.id) {
                          value.selected = true;
                        } else {
                          value.selected = false;
                        }
                        return value;
                      }),
                    );
                  }}
                />
              );
            })}
          </View>
        </View>
      ) : (
        <Text style={TextStyles.H2}>loading...</Text>
      ),
    },
    {
      progressIndicatorStep: [false, false, false, true, false],
      render: (
        <View>
          <Text style={TextStyles.H2}>Help me help you.</Text>
          <Text style={TextStyles.B1}>
            Now that I know more about what fuels your fire, I'd like to be able
            to personalize your suggestions on a daily basis.
          </Text>
          <View style={{ marginTop: 40 }}>
            <Checkbox
              title="Allow location access"
              body={
                "I'd prefer to give you and bae the green light when you are actually near each other..."
              }
              checked={checkedItems.location}
              onPress={() =>
                setCheckedItems({
                  ...checkedItems,
                  location: !checkedItems.location,
                })
              }
            />
            <Checkbox
              title="Allow access to Apple Health"
              body="Learning about your sleep patterns and activity can help me suggest the best moments."
              checked={checkedItems.health}
              onPress={() => {
                setCheckedItems({
                  ...checkedItems,
                  health: !checkedItems.health,
                });
                connectHealthKit();
              }}
            />
            <Checkbox
              title="Sync your calendar"
              body={
                "Gotta know when you're busy in order to know when you should get busy!"
              }
              checked={checkedItems.calendar}
              onPress={() => {
                setCheckedItems({
                  ...checkedItems,
                  calendar: !checkedItems.calendar,
                });
                connectCalendars();
              }}
            />
          </View>
          <Text style={[TextStyles.B1, { marginTop: 29 }]}>
            Your Twitter feed
          </Text>
          <Text style={[TextStyles.B2, { color: Colors.black4 }]}>
            You might not realize how what you see or read can affect your mood.
            I'll help see if it's souring your vibe.
          </Text>
          <BrandTextInput
            label={"What's your Twitter handle?"}
            value={twitterHandle}
            onChangeValue={setTwitterHandle}
            style={{ marginTop: 8 }}
          />
        </View>
      ),
    },
    {
      progressIndicatorStep: [false, false, false, false, true],
      render: (
        <View style={styles.sliderQuestionContainer}>
          <View>
            <Text style={TextStyles.H2}>
              Last step! Let's put the BAE in BaeWatch.
            </Text>
            <Text style={TextStyles.B1}>
              Invite your partner so I can compare your moods and needs, and
              help you both find moments to connect.
            </Text>
          </View>
          <BrandTextInput
            label={"What's bae's cell?"}
            value={baephone}
            onChangeValue={setBaephone}
          />
        </View>
      ),
    },
  ];

  if (userWasInvited) {
    // don't need the last question
    questions.pop();
    questions = questions.map(q => {
      return {
        ...q,
        progressIndicatorStep: q.progressIndicatorStep.slice(0, -1),
      };
    });
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'goForward':
        if (state.screenNumber < questions.length - 1) {
          return { screenNumber: state.screenNumber + 1 };
        } else {
          return { screenNumber: state.screenNumber };
        }
      case 'goBackward':
        if (state.screenNumber > 0) {
          return { screenNumber: state.screenNumber - 1 };
        } else {
          return { screenNumber: state.screenNumber };
        }
      default:
        throw new Error();
    }
  };

  const initialProgressState = {
    screenNumber: 0,
  };
  const [progressState, dispatch] = useReducer(reducer, initialProgressState);

  const submit = async () => {
    const jwt = await AsyncStorage.getItem('userToken');
    const url = `http://10.1.10.163:1337/users/${initialUserData.id}`;
    const payload = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        twitter: twitterHandle,
        activity: activityAnswer,
        busy: busyAnswer,
        languages: loveLanguages.filter(l => l.selected)[0],
        baephone: baephone,
        baeConfirmed: baeConfirmed,
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
        navigation.navigate('Home');
      } else {
        throw Error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitButton = () => {
    const title = userWasInvited ? 'Done' : 'Invite your bae';
    if (progressState.screenNumber === questions.length - 1) {
      return <BrandButton variant="primary" title={title} onPress={submit} />;
    } else {
      return null;
    }
  };

  return (
    <KeyboardAvoidingView behavior='position'>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Image
              style={styles.bae}
              source={require('@assets/images/bae.png')}
            />
            <ProgressIndicator
              progress={
                questions[progressState.screenNumber].progressIndicatorStep
              }
            />
          </View>
          <View style={styles.questionContainer}>
            {questions[progressState.screenNumber].render}
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <View style={{ flexGrow: 1 }}>{submitButton()}</View>
          <View style={styles.buttonContainer}>
            <ArrowButton
              highlight={progressState.screenNumber > 0}
              orientation="up"
              onPress={() => dispatch({ type: 'goBackward' })}
            />
            <ArrowButton
              highlight={progressState.screenNumber < questions.length - 1}
              orientation="down"
              onPress={() => dispatch({ type: 'goForward' })}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.black1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionContainer: {
    marginTop: 8,
  },
  sliderQuestionContainer: {
    height: 294,
    justifyContent: 'space-between',
  },
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
  },
  buttonContainer: {
    height: 80,
    marginLeft: 24,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bae: {
    height: 64,
    width: 64,
  },
});

export default OnboardingScreen;
