import React from 'react';
import { Button, View } from 'react-native';
import { Colors, TextStyles } from '@style';
import { StyleSheet } from 'react-native';

const QuestionTwoScreen = ({ navigation }) => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors.black1,
        }
    });

    const goForward = async () => {
        navigation.navigate('QuestionThree');
    };

    const goBack = async () => {
        navigation.navigate('QuestionOne');
    };

    return (
        <View style={styles.container}>
            <Button title="Go to Question Three" onPress={goForward} />
            <Button title="Back to Question One" onPress={goBack} />
        </View>
    );
};


export default QuestionTwoScreen;