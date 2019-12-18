import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet, StatusBar } from 'react-native';
import { BrandButton } from '@components';
import { Colors } from '@style';

const HomeScreen = ({ navigation }) => {
  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
  };

  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <BrandButton
          title="Sign Out"
          onPress={signOut}
          variant="tertiary"
          style={styles.bigButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: Colors.black,
    justifyContent: 'center',
  },
  bigButton: {
    marginHorizontal: 24,
  },
});

export default HomeScreen;
