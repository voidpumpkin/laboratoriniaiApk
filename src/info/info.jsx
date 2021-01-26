import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

const Info = () => {
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
            <Text>Informacija apie programą</Text>
        </View>
    );
};

export default Info;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        marginBottom: 15,
    },
    sharableText: {
        paddingVertical: 5,
    },
    sharableTextContainer: {
        paddingLeft: 10,
        marginBottom: 15,
    },
    share: {
        marginBottom: 15,
    },
});
