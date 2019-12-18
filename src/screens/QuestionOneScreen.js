import React from 'react';
import { Button, View } from 'react-native';
import { Colors, TextStyles } from '@style';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';

const QuestionOneScreen = ({ navigation }) => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors.black1,
            flex: 1
        }
    });

    const goForward = async () => {
        navigation.navigate('QuestionTwo');
    };

    const goBack = async () => {
        navigation.navigate('GetStarted');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Button title="Go to Question Two" onPress={goForward} />
                <Button title="Back to Get Started" onPress={goBack} />
            </View>
        </SafeAreaView>
    );
};

export default QuestionOneScreen;