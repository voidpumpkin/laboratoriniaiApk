import React, { useState } from 'react';
import { StyleSheet, Platform, ScrollView, Picker } from 'react-native';
import { useTheme, TextInput, Button, Checkbox, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Stars from 'react-native-stars';
import { AntDesign as Icon } from '@expo/vector-icons';

const { Item: CheckboxItem } = Checkbox;
const isIos = Platform.OS === 'ios';

const Lab3 = () => {
    const { colors } = useTheme();
    const [title, setTitle] = useState('');
    const [faculty, setFaculty] = useState('');
    const [difficulty, setDifficulty] = useState(2);
    const [day, setDay] = useState('Pirmadienis');
    const [date, setDate] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(isIos || false);
    const [willRegister, setWillRegister] = useState(false);

    const time = `${date.getHours().toString()}:${date.getMinutes().toString()}`;

    const onSave = () => {
        alert(
            `pavadinimas - ${title}
fakultetas - ${faculty}
sunkumas - ${difficulty} zvaigzdes
diena - ${day}
laikas - ${time}
Ar registruosis - ${willRegister ? 'taip' : 'ne'}`
        );
    };

    return (
        <ScrollView
            style={[
                styles.container,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <TextInput
                label="Pavadinimas"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
            />
            <TextInput
                label="Fakultetas"
                value={faculty}
                onChangeText={(text) => setFaculty(text)}
                style={styles.input}
                multiline
            />
            <Text style={{ color: colors.primary }}>Sunkumas:</Text>
            <Stars
                default={difficulty}
                half={false}
                fullStar={<Icon name="star" size={50} color={colors.primary} />}
                emptyStar={<Icon name="staro" size={50} color={colors.primary} />}
                update={(newDifficulty) => setDifficulty(newDifficulty)}
            />
            <Text style={{ color: colors.primary }}>Diena:</Text>
            <Picker
                itemStyle={{ color: colors.onBackground }}
                style={{ color: colors.onBackground }}
                selectedValue={day}
                onValueChange={(newDay) => setDay(newDay)}
            >
                <Picker.Item label={'Pirmadienis'} value={'Pirmadienis'} />
                <Picker.Item label={'Antradienis'} value={'Antradienis'} />
                <Picker.Item label={'Treciadienis'} value={'Treciadienis'} />
                <Picker.Item label={'Ketvirtadienis'} value={'Ketvirtadienis'} />
                <Picker.Item label={'Penktadienis'} value={'Penktadienis'} />
                <Picker.Item label={'Sestadienis'} value={'Sestadienis'} />
                <Picker.Item label={'Sekmadienis'} value={'Sekmadienis'} />
            </Picker>
            <Text style={{ color: colors.primary }}>Laikas:</Text>
            {!isIos && (
                <>
                    <Text>{time}</Text>
                    <Button
                        mode="contained"
                        icon="calendar"
                        color={colors.primary}
                        size={20}
                        onPress={() => setShowTimePicker(true)}
                    >
                        Pasirinkti laika
                    </Button>
                </>
            )}
            {showTimePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="time"
                    display="default"
                    onChange={(event, selectedDate) => {
                        if (!isIos) setShowTimePicker(false);
                        if (selectedDate) setDate(selectedDate);
                    }}
                    textColor={colors.onBackground}
                />
            )}
            <CheckboxItem
                label="Registruotis"
                status={willRegister ? 'checked' : 'unchecked'}
                onPress={() => setWillRegister(!willRegister)}
                style={styles.input}
            />
            <Button mode="contained" onPress={onSave}>
                Saugoti
            </Button>
        </ScrollView>
    );
};

export default Lab3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 50,
    },
    input: {
        marginBottom: 15,
    },
});
