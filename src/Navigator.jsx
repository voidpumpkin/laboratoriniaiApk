/* eslint-disable react/display-name */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import HomeScreen from './HomeScreen';
import Lab2 from './lab2/Lab2';
import Lab3 from './lab3/Lab3';
import Lab4 from './lab4/Lab4';
import Lab5 from './lab5/Lab5';
import { useTheme } from 'react-native-paper';
import { NAVIGATIONS } from './constants';

const { Header, BackAction, Content } = Appbar;
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
                    header: ({ scene, previous, navigation }) => {
                        const { headerTitle, title, headerStyle } = scene.descriptor.options;
                        return (
                            <Header style={headerStyle}>
                                {previous && <BackAction onPress={navigation.goBack} />}
                                <Content title={headerTitle || title || scene.route.name} />
                            </Header>
                        );
                    },
                }}
            >
                <Screen name={NAVIGATIONS.HOME} component={HomeScreen} />
                <Screen name={NAVIGATIONS.LAB2} component={Lab2} />
                <Screen name={NAVIGATIONS.LAB3} component={Lab3} />
                <Screen name={NAVIGATIONS.LAB4} component={Lab4} />
                <Screen
                    name={NAVIGATIONS.LAB5}
                    component={Lab5}
                    options={{
                        transitionSpec: {
                            open: {
                                animation: 'spring',
                                config: {
                                    stiffness: 1000000,
                                    damping: 50000,
                                },
                            },
                            close: {
                                animation: 'spring',
                                config: {
                                    stiffness: 1000000,
                                    damping: 50000,
                                },
                            },
                        },
                    }}
                />
            </StackNavigator>
        </NavigationContainer>
    );
};

export default Navigator;
