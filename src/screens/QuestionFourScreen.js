import React from 'react';
import { Button, View, SafeAreaView } from 'react-native';
import { Colors, TextStyles } from '@style';
import { StyleSheet } from 'react-native';

const QuestionFourScreen = ({ navigation }) => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors.black1,
            flex: 1
        }
    });

    const goForward = async () => {
        navigation.navigate('App');
    };

    const goBack = async () => {
        navigation.navigate('QuestionThree');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Button title="Go to the HomeScreen" onPress={goForward} />
                <Button title="Back to Question Three" onPress={goBack} />
            </View>
        </SafeAreaView>

    );
};

export default QuestionFourScreen;