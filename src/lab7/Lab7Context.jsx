import React, { useState, useEffect, useRef, useCallback, createContext } from 'react';
import { AsyncStorage } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Battery from 'expo-battery';
import setupNotifications from './setupNotifications';
import Constants from 'expo-constants';

setupNotifications();

const Lab7Context = createContext('light');

const Lab7ContextProvider = ({ children }) => {
    const [isWatchingBattery, setIsWatchingBattery] = useState(null);
    const batteryLevelRef = useRef(null);

    useEffect(() => {
        (async () => {
            const isWatching = await AsyncStorage.getItem('isWatchingBattery');
            if (isWatching === 'false' || isWatching === 'true') {
                setIsWatchingBattery(isWatching === 'true');
                return;
            }
            await AsyncStorage.setItem('isWatchingBattery', 'false');
        })();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('isWatchingBattery', `${isWatchingBattery}`);
    }, [isWatchingBattery]);

    const spyBattery = useCallback(async () => {
        const newBatteryLevel = Math.round((await Battery.getBatteryLevelAsync()) * 100);
        if (!isWatchingBattery || newBatteryLevel === batteryLevelRef.current) {
            return;
        }
        batteryLevelRef.current = newBatteryLevel;
        await Notifications.scheduleNotificationAsync({
            content: {
                title: `🔋Battery level at ${newBatteryLevel}% `,
            },
            trigger: null,
        });
    }, [isWatchingBattery]);

    useEffect(() => {
        if (!Constants.isDevice) {
            return;
        }
        if (batteryLevelRef.current === null) {
            spyBattery();
            return;
        }
        let interval = setInterval(spyBattery, 1000 * 60);
        return () => clearInterval(interval);
    }, [isWatchingBattery, spyBattery]);

    return (
        <Lab7Context.Provider
            value={{
                isWatchingBattery,
                setIsWatchingBattery,
            }}
        >
            {children}
        </Lab7Context.Provider>
    );
};

export { Lab7Context as default, Lab7Context, Lab7ContextProvider };
