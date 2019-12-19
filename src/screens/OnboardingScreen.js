import React, { useState, useReducer, useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { TextStyles, Colors } from '@style';
import { ProgressIndicator, ArrowButton, BrandSlider } from '@components';
import { StackViewStyleInterpolator } from 'react-navigation-stack';

const OnboardingScreen = ({ navigation }) => {
  const name = navigation.getParam('name');

  const [loveLanguages, setLoveLanguages] = useState([]);
  const fetchLanguages = useEffect(() => {
    const doFetch = async () => {
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
      setLoveLanguages(jsonResponse);
    };

    doFetch();
  }, []);

  const [busyAnswer, setBusyAnswer] = useState(5);
  const [activityAnswer, setActivityAnswer] = useState(5);

  const questions = [
    {
      progressIndicatorStep: 0,
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
      progressIndicatorStep: 0,
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
      progressIndicatorStep: 1,
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
      progressIndicatorStep: 2,
      render: loveLanguages ? (
        <View>
          <Text style={TextStyles.H2}>
            Now, pick your primary love language:
          </Text>
          {loveLanguages.map((language, k) => {
            return (
              <Text key={k} style={TextStyles.B1}>
                {language.title}
              </Text>
            );
          })}
        </View>
      ) : (
        <Text style={TextStyles.H2}>loading...</Text>
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
            <ProgressIndicator progress={[true, true, true, false, false]} />
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
