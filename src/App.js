/**
 * Sample Reaßt Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AuthLoadingScreen, SignInScreen, HomeScreen, GetStartedScreen, QuestionOneScreen, QuestionTwoScreen, QuestionThreeScreen, QuestionFourScreen } from '@screens';

const AppStack = createStackNavigator({
  Home: HomeScreen,
});

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
});

const OnboardingStack = createStackNavigator(
  {
    GetStarted: GetStartedScreen,
    QuestionOne: QuestionOneScreen,
    QuestionTwo: QuestionTwoScreen,
    QuestionThree: QuestionThreeScreen,
    QuestionFour: QuestionFourScreen,
  },
  {
    initialRouteName: 'GetStarted'
  }
)

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
      Onboarding: OnboardingStack
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default function App() {
  return <AppContainer />;
}
