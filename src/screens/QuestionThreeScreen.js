import React from 'react';
import { Button, View, SafeAreaView } from 'react-native';
import { Colors, TextStyles } from '@style';
import { StyleSheet } from 'react-native';

const QuestionThreeScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.black1,
      flex: 1,
    },
  });

  const goForward = async () => {
    navigation.navigate('QuestionFour');
  };

  const goBack = async () => {
    navigation.navigate('QuestionTwo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button title="Go to Question Four" onPress={goForward} />
        <Button title="Back to Question Two" onPress={goBack} />
      </View>
    </SafeAreaView>
  );
};

export default QuestionThreeScreen;
