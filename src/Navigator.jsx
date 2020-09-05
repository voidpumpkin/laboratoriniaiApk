/* eslint-disable react/display-name */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import { NAVIGATIONS } from './constants';
import Header from './Header';
import HomeScreen from './HomeScreen';
import Lab2 from './lab2/Lab2';
import Lab3 from './lab3/Lab3';
import Lab4 from './lab4/Lab4';
import Lab5 from './lab5/Lab5';
import screenOptionsLab5 from './lab5/screenOptions.json';
import Lab6 from './lab6/Lab6';

const { Navigator: StackNavigator, Screen } = createStackNavigator();

const Navigator = () => {
    const { colors } = useTheme();

    return (
        <NavigationContainer>
            <StackNavigator
                initialRouteName={NAVIGATIONS.HOME}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.primary,
                    },
                    header: (props) => <Header {...props} />,
                }}
            >
                <Screen name={NAVIGATIONS.HOME} component={HomeScreen} />
                <Screen name={NAVIGATIONS.LAB2} component={Lab2} />
                <Screen name={NAVIGATIONS.LAB3} component={Lab3} />
                <Screen name={NAVIGATIONS.LAB4} component={Lab4} />
                <Screen name={NAVIGATIONS.LAB5} component={Lab5} options={screenOptionsLab5} />
                <Screen name={NAVIGATIONS.LAB6} component={Lab6} />
            </StackNavigator>
        </NavigationContainer>
    );
};

export default Navigator;
