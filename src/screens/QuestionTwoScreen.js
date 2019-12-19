import React from 'react';
import { Button, View, SafeAreaView } from 'react-native';
import { Colors, TextStyles } from '@style';
import { StyleSheet } from 'react-native';

const QuestionTwoScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.black1,
      flex: 1,
    },
  });

  const goForward = async () => {
    navigation.navigate('QuestionThree');
  };

  const goBack = async () => {
    navigation.navigate('QuestionOne');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button title="Go to Question Three" onPress={goForward} />
        <Button title="Back to Question One" onPress={goBack} />
      </View>
    </SafeAreaView>
  );
};

export default QuestionTwoScreen;
