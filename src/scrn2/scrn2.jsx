import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, TextInput, Button } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';

const Scrn2 = () => {
    const { colors } = useTheme();
    const [sharableText, setSharableText] = useState('');

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <TextInput
                label="Informacija"
                value={sharableText}
                onChangeText={(text) => setSharableText(text)}
                style={styles.input}
            />
            <Button
                style={styles.share}
                mode="contained"
                onPress={async () => {
                    const fileUri = FileSystem.documentDirectory + 'rez.txt';
                    await FileSystem.writeAsStringAsync(fileUri, sharableText);
                    console.log(
                        await FileSystem.getInfoAsync(fileUri),
                        await FileSystem.readAsStringAsync(fileUri)
                    );
                }}
            >
                Išsaugoti
            </Button>
        </View>
    );
};

export default Scrn2;

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
