import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import ViewMenu from './ViewMenu';
import DatePickingModal from './DatePickingModal';
import Lab6Context from './Lab6Context';

const Lab6 = () => {
    const { colors } = useTheme();
    const { datePickerState } = useContext(Lab6Context);
    const { timeDiffrence } = datePickerState;
    const [firstText, setFirstText] = useState('12');
    const [secondText, setSecondText] = useState('pradinis tekstas');
    const [letterPos, setLetterPos] = useState(0);
    const [letterTickingText, setLetterTickingText] = useState(null);

    useEffect(() => {
        if (timeDiffrence === null) {
            return;
        }
        setFirstText(`Laiko skirtumas yra ${timeDiffrence} minutes`);
    }, [timeDiffrence]);

    useEffect(() => {
        //Show letters one by one eatch second
        let interval = null;
        if (letterTickingText) {
            interval = setInterval(() => {
                setLetterPos((letterPos) => {
                    if (letterPos + 1 >= letterTickingText.length) {
                        setLetterTickingText(null);
                        return letterPos;
                    }
                    return letterPos + 1;
                });
            }, 1000);
        } else if (!letterTickingText && letterPos !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [firstText.length, letterTickingText, letterPos]);

    const handleItemPress = (text) => (itemPressed) => {
        if (itemPressed === 0) setSecondText(`pirmame laukelyje yra ${text.length} simboliai`);
        else if (itemPressed === 1) {
            setLetterTickingText(text);
            setLetterPos(0);
        }
    };

    return (
        <>
            <DatePickingModal />
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                <ViewMenu
                    style={styles.text}
                    items={['Simboliu skaicius siame tekste', 'Simboliu vardijimas po viena']}
                    onItemPress={handleItemPress(firstText)}
                    anchor={(props) => <Text {...props}>{firstText}</Text>}
                />
                <ViewMenu
                    style={styles.text}
                    items={['Simboliu skaicius siame tekste', 'Simboliu vardijimas po viena']}
                    onItemPress={handleItemPress(secondText)}
                    anchor={(props) => <Text {...props}>{secondText}</Text>}
                />
                {letterTickingText && <Text>{letterTickingText[letterPos]}</Text>}
            </View>
        </>
    );
};

export default Lab6;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    text: {
        marginBottom: 15,
    },
});
