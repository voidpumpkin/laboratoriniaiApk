import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import setupNotifications from './setupNotifications';

setupNotifications();

const HomeScreen = () => {
    const { colors } = useTheme();

    const [md5, setMd5] = useState({
        current: null,
        new: null,
        shouldUpdate: undefined,
    });

    const fetchMd5 = async () => {
        const reponse = await fetch('http://md5.jsontest.com/?text=example_texts');
        const bodu = await reponse.json();
        return bodu.md5;
    };

    const handleRenewal = async () => {
        await AsyncStorage.setItem('@md5', md5.new);
        setMd5({
            ...md5,
            current: md5.new,
            shouldUpdate: false,
        });
    };

    const onMount = async () => {
        const fetchedMd5 = await fetchMd5();
        const savedMd5 = await AsyncStorage.getItem('@md5');
        console.log(fetchedMd5);
        console.log('savedMd5', savedMd5);
        if (!savedMd5) {
            await AsyncStorage.setItem('@md5', fetchedMd5);
            setMd5({
                current: fetchedMd5,
                new: null,
                shouldUpdate: false,
            });
            return;
        }
        if (savedMd5 !== fetchedMd5) {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `Atnaujinkite duomenis`,
                },
                trigger: null,
            });
            setMd5({
                current: savedMd5,
                new: fetchedMd5,
                shouldUpdate: true,
            });
            return;
        }
        setMd5({
            current: savedMd5,
            new: null,
            shouldUpdate: false,
        });
    };

    useEffect(() => {
        onMount();
    }, []);

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <Text>Dabartinis md5: {md5.current || 'null'}</Text>
            <Text>Naujas md5: {md5.new || 'tokspat'}</Text>
            {md5.shouldUpdate && (
                <Button style={styles.button} mode="contained" onPress={handleRenewal}>
                    Atnaujinkite
                </Button>
            )}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1,
        alignItems: 'center',
    },
    button: {
        marginTop: 20,
    },
});
