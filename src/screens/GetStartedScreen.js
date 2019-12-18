import React from 'react';
import { Button, View } from 'react-native';
import { Colors, TextStyles } from '@style';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';

const GetStartedScreen = ({ navigation }) => {
    const goForward = async () => {
        navigation.navigate('QuestionOne');
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors.black1,
        }
    });

    return (
        <View styles={styles.container}>
            <Text>
                Hello, Im Baewatch!
            </Text>
            <Button title="Continue to Question One" onPress={goForward} />
        </View>
    );
};

export default GetStartedScreen;