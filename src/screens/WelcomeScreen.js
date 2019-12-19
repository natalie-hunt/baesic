import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { BrandButton } from '@components';
import { TextStyles, Colors } from '@style';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.copyContainer}>
          <View style={styles.baeContainer}>
            <Image
              style={styles.bae}
              source={require('@assets/images/bae.png')}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[TextStyles.H1, styles.title]}>Hello,</Text>
            <Text style={[TextStyles.H1, styles.title]}>I'm BaeWatch!</Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={[TextStyles.B1, styles.subtitle]}>
              I'm here to help you and your
            </Text>
            <Text style={[TextStyles.B1, styles.subtitle]}>bae get it on.</Text>
          </View>
        </View>
        <View style={styles.c2aContainer}>
          <BrandButton
            title="SIGN ME UP"
            variant="primary"
            onPress={() => navigation.navigate('SignUp')}
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
  copyContainer: {
    marginTop: 160,
  },
  c2aContainer: {
    marginBottom: 48,
    height: 104,
    justifyContent: 'space-between',
  },
  baeContainer: {
    alignItems: 'center',
  },
  bae: {
    width: 64,
    height: 64,
    resizeMode: 'center',
  },
  titleContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  title: {
    color: Colors.offWhite2,
  },
  subtitleContainer: {
    marginTop: 8,
    marginHorizontal: 32,
  },
  subtitle: {
    color: Colors.offWhite1,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
