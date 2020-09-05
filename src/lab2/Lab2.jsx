import React, { useState } from 'react';
import { StyleSheet, View, Share } from 'react-native';
import { useTheme, TextInput, Text, Button } from 'react-native-paper';
const { share, sharedAction, dismissedAction } = Share;

const Lab2 = () => {
    const { colors } = useTheme();
    const [sharableText, setSharableText] = useState('bobas buvo');
    const wordCount = (sharableText.match(/\S*/g) || []).filter((word) => word.length).length;

    const onShare = async () => {
        try {
            const result = await share({
                message: sharableText,
            });
            if (result.action === sharedAction) {
                if (result.activityType) {
                    // shared in ios with activity type of result.activityType
                    alert('shared with activity type of ', result.activityType);
                } else {
                    // shared in android
                    alert('shared');
                }
            } else if (result.action === dismissedAction) {
                // dismissed
                alert('dismissed');
            }
        } catch (error) {
            alert(error.message);
        }
    };

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
                label="Norimo dalintis teksto ivestis"
                value={sharableText}
                onChangeText={(text) => setSharableText(text)}
                style={styles.input}
            />
            <Button style={styles.share} icon="share-variant" mode="contained" onPress={onShare}>
                Dalintis tekstu
            </Button>
            <View style={styles.sharableTextContainer}>
                <Text style={{ color: colors.primary }}>Norimas dalintis tekstas:</Text>
                <Text style={styles.sharableText}>{sharableText}</Text>
            </View>
            <View style={styles.sharableTextContainer}>
                <Text style={{ color: colors.primary }}>Tekste zodziu skaicius:</Text>
                <Text style={styles.sharableText}>{wordCount}</Text>
            </View>
        </View>
    );
};

export default Lab2;

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
