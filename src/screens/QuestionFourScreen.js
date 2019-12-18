import React from 'react';
import { Button, View } from 'react-native';
import { Colors, TextStyles } from '@style';
import { StyleSheet } from 'react-native';

const QuestionFourScreen = ({ navigation }) => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors.black1,
        }
    });
    
    const goForward = async () => {
        navigation.navigate('App');
    };

    const goBack = async () => {
        navigation.navigate('QuestionThree');
    };

    return (
        <View style={styles.container}>
            <Button title="Go to the HomeScreen" onPress={goForward} />
            <Button title="Back to Question Three" onPress={goBack} />
        </View>
    );
};

export default QuestionFourScreen;