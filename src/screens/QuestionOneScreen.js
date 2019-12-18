import React from 'react';
import { Button, View } from 'react-native';
import { Colors, TextStyles } from '@style';
import { StyleSheet } from 'react-native';

const QuestionOneScreen = ({ navigation }) => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors.black1,
        }
    });

    const goForward = async () => {
        navigation.navigate('QuestionTwo');
    };

    const goBack = async () => {
        navigation.navigate('GetStarted');
    };

    return (
        <View style={styles.container}>
            <Button title="Go to Question Two" onPress={goForward} />
            <Button title="Back to Get Started" onPress={goBack} />
        </View>
    );
};

export default QuestionOneScreen;