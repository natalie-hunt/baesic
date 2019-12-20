import React, { useState, useReducer, useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { TextStyles, Colors } from '@style';
import {
  ProgressIndicator,
  ArrowButton,
  BrandSlider,
  RadioOption,
  Checkbox,
} from '@components';
import { BrandTextInput } from '../components';

const OnboardingScreen = ({ navigation }) => {
  const name = navigation.getParam('name');

  const [loveLanguages, setLoveLanguages] = useState([]);
  useEffect(() => {
    const fetchLangauges = async () => {
      const url = 'http://10.1.10.163:1337/languages';
      const payload = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
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
    };

    fetchLangauges();
  }, []);

  const [busyAnswer, setBusyAnswer] = useState(5);
  const [activityAnswer, setActivityAnswer] = useState(5);
  const [checkedItems, setCheckedItems] = useState({
    location: false,
    health: false,
    calendar: false,
  });
  const [twitterHandle, setTwitterHandle] = useState('');
  console.log('love: ', loveLanguages);

  const questions = [
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
              onPress={() =>
                setCheckedItems({
                  ...checkedItems,
                  health: !checkedItems.health,
                })
              }
            />
            <Checkbox
              title="Sync your calendar"
              body={
                "Gotta know when you're busy in order to know when you should get busy!"
              }
              checked={checkedItems.calendar}
              onPress={() =>
                setCheckedItems({
                  ...checkedItems,
                  calendar: !checkedItems.calendar,
                })
              }
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
  ];

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

  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Image
              style={styles.bae}
              source={require('@assets/images/bae.png')}
            />
            <ProgressIndicator progress={questions[progressState.screenNumber].progressIndicatorStep} />
          </View>
          <View style={styles.questionContainer}>
            {questions[progressState.screenNumber].render}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ArrowButton
            highlight={false}
            orientation="up"
            onPress={() => dispatch({ type: 'goBackward' })}
          />
          <ArrowButton
            highlight={true}
            orientation="down"
            onPress={() => dispatch({ type: 'goForward' })}
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
  buttonContainer: {
    height: 80,
    justifyContent: 'space-between',
    marginBottom: 36,
    alignItems: 'flex-end',
  },
  bae: {
    height: 64,
    width: 64,
  },
});

export default OnboardingScreen;
