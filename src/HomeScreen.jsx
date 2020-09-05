import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { NAVIGATIONS } from './constants';

const navigationsArr = Object.entries(NAVIGATIONS);
// eslint-disable-next-line no-unused-vars
const [_, ...navigationsForButtons] = navigationsArr;

const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();
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
});
