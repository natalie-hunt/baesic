import React from 'react';
import { Button, View } from 'react-native';
import { Colors, TextStyles } from '@style';
import { Text, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';

const GetStartedScreen = ({ navigation }) => {
    const goForward = async () => {
        navigation.navigate('QuestionOne');
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors.black1,
            flex: 1
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>
                    Hello, Im Baewatch!
                </Text>
                <Button title="Continue to Question One" onPress={goForward} />
            </View>
        </SafeAreaView>
    );
};

export default GetStartedScreen;