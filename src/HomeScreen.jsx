import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { Button, useTheme, TextInput } from 'react-native-paper';
import { NAVIGATIONS } from './constants';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';
import * as Notifications from 'expo-notifications';

import setupNotifications from './utils/setupNotifications';

setupNotifications();

const navigationsArr = Object.entries(NAVIGATIONS);
// eslint-disable-next-line no-unused-vars
const [_, ...navigationsForButtons] = navigationsArr;

const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [text, setText] = React.useState('');
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            {/* eslint-disable-next-line no-unused-vars */}
            {navigationsForButtons.map(([_, NAVIGATION]) => (
                <Button
                    style={styles.button}
                    mode="contained"
                    onPress={() => navigation.navigate(NAVIGATION)}
                    key={NAVIGATION}
                >
                    {NAVIGATION}
                </Button>
            ))}
            <Button
                style={styles.button}
                mode="contained"
                onPress={async () => {
                    const fileUri = FileSystem.documentDirectory + 'rez.txt';
                    const fileText = await FileSystem.readAsStringAsync(fileUri);
                    setText(fileText);
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: `Email atidarytas su nuskaityta informacija `,
                        },
                        trigger: null,
                    });
                    MailComposer.composeAsync({
                        body: fileText,
                    });
                }}
            >
                Nuskaityti informaciją
            </Button>
            <Button style={styles.button} mode="contained" onPress={BackHandler.exitApp}>
                Uždaryti programą
            </Button>
            <TextInput
                style={styles.flexiukas}
                label="Iš failo nuskaityta informacija"
                value={text}
                mode="outlined"
                onChangeText={(text) => setText(text)}
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
    },
    flexiukas: {
        flex: 1,
        width: '100%',
    },
});
