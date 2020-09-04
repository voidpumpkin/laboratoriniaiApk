import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { NAVIGATIONS } from './constants';

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
            <Button
                style={styles.button}
                mode="contained"
                onPress={() => navigation.navigate(NAVIGATIONS.LAB2)}
            >
                Laboratorinis 2
            </Button>
            <Button
                style={styles.button}
                mode="contained"
                onPress={() => navigation.navigate(NAVIGATIONS.LAB3)}
            >
                Laboratorinis 3
            </Button>
            <Button
                style={styles.button}
                mode="contained"
                onPress={() => navigation.navigate(NAVIGATIONS.LAB4)}
            >
                Laboratorinis 4
            </Button>
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
