import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTheme, List, Text, Colors } from 'react-native-paper';
import students from './students.json';

const { Item } = List;

const Lab5 = ({ navigation }) => {
    const { colors } = useTheme();
    const [popUps, setPopups] = useState([]);
    const { name, aCount, upperCaseCount, lowerCaseCount, voiceLettersCount } =
        popUps[popUps.length - 1] || {};

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (!popUps.length) {
                return;
            }
            setPopups(popUps.slice(0, popUps.length - 1));
            e.preventDefault();
        });
        return unsubscribe;
    }, [navigation, popUps]);

    const handlePress = (pressedName) => {
        if (pressedName === name) {
            return;
        }
        const aCount = (pressedName.match(/a|A/) || []).length;
        if (aCount) {
            setPopups([
                ...popUps,
                {
                    name: pressedName,
                    aCount,
                },
            ]);
        } else {
            setPopups([
                ...popUps,
                {
                    name: pressedName,
                    upperCaseCount: (pressedName.match(/[A-Z]/) || []).length,
                    lowerCaseCount: (pressedName.match(/[a-z]/) || []).length,
                    voiceLettersCount: (pressedName.match(/[a|A|e|E|i|I|y|Y|u|U|o|O]/) || [])
                        .length,
                },
            ]);
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
            <ScrollView>
                {students.map(({ id, first_name }) => (
                    <Item title={first_name} key={id} onPress={() => handlePress(first_name)} />
                ))}
            </ScrollView>
            {popUps[popUps.length - 1] && (
                <View style={styles.popUp}>
                    <Text>Vardas: {name}</Text>
                    {aCount && <Text>A ir a raidziu varde yra: {aCount}</Text>}
                    {!aCount && <Text>Vardo ilgis: {name.length}</Text>}
                    {upperCaseCount && <Text>Didziuju raidziu varde yra: {upperCaseCount}</Text>}
                    {lowerCaseCount && <Text>Mazuju raidziu varde yra: {lowerCaseCount}</Text>}
                    {voiceLettersCount && <Text>Balsiu varde yra: {voiceLettersCount}</Text>}
                </View>
            )}
        </View>
    );
};

export default Lab5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    popUp: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: Colors.grey900,
        padding: 20,
    },
});
