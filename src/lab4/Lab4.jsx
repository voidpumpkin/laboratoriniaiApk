import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, TextInput } from 'react-native-paper';
import { WebView as ReactWebView } from 'react-native-webview';

const Lab4 = () => {
    const { colors } = useTheme();
    const [uri, setUri] = useState('https://www.google.lt');
    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                <TextInput
                    label="Url"
                    value={uri}
                    onChangeText={(text) => setUri(text)}
                    style={styles.input}
                />
                <ReactWebView source={{ uri }} />
            </View>
        </>
    );
};

export default Lab4;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
