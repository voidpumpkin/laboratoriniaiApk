/* eslint-disable react/display-name */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import { NAVIGATIONS } from './constants';
import Header from './Header';
import HomeScreen from './HomeScreen';
import Scrn2 from './scrn2/scrn2';
import Info from './info/info';

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
                <Screen name={NAVIGATIONS.SCRN2} component={Scrn2} />
                <Screen name={NAVIGATIONS.INFO} component={Info} />
            </StackNavigator>
        </NavigationContainer>
    );
};

export default Navigator;
