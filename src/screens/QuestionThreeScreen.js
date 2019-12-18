import React from 'react';
import { Button, View } from 'react-native';
import { Colors, TextStyles } from '@style';
import { StyleSheet } from 'react-native';

const QuestionThreeScreen = ({ navigation }) => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors.black1,
        }
    });

    const goForward = async () => {
        navigation.navigate('QuestionFour');
    };

    const goBack = async () => {
        navigation.navigate('QuestionTwo');
    };

    return (
        <View style={styles.container}>
            <Button title="Go to Question Four" onPress={goForward} />
            <Button title="Back to Question Two" onPress={goBack} />
        </View>
    );
};


export default QuestionThreeScreen;