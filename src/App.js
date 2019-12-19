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
import {
  AuthLoadingScreen,
  SignInScreen,
  SignUpScreen,
  HomeScreen,
} from '@screens';
import { Animated, Easing } from 'react-native';
import { WelcomeScreen } from './screens';
import OnboardingScreen from './screens/OnboardingScreen';

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const AuthStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    Onboarding: OnboardingScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ layout, position, scene }) => {
      const { index } = scene;
      const { initHeight } = layout;

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initHeight, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateY }] };
    },
  };
};

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default function App() {
  return <AppContainer />;
}
