import React, { useState, useContext } from 'react';
import { View, Platform } from 'react-native';
import { Portal, Modal, useTheme, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Lab6Context from './Lab6Context';

const isIos = Platform.OS === 'ios';

const DatePickingModal = () => {
    const { colors } = useTheme();
    const { datePickerState, setDatePickerState } = useContext(Lab6Context);
    const isDateModalVisible = datePickerState.isVisible;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');

    const handleClose = () => {
        const diff = Math.abs(date - new Date());
        const timeDiffrence = Math.floor(diff / 1000 / 60);
        setDatePickerState((oldState) => ({
            ...oldState,
            timeDiffrence,
            isVisible: false,
        }));
        setMode('date');
    };

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
        if (isIos) {
            return;
        }
        if (mode === 'date') {
            setMode('time');
        } else {
            handleClose();
        }
    };

    return (
        <Portal>
            <Modal visible={isDateModalVisible} onDismiss={() => handleClose()}>
                <View
                    style={{
                        backgroundColor: colors.surface,
                        marginHorizontal: 30,
                        padding: 20,
                    }}
                >
                    {isDateModalVisible && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            display="spinner"
                            onChange={onChange}
                            textColor={colors.onBackground}
                        />
                    )}
                    {isIos && isDateModalVisible && (
                        <Button onPress={() => (mode === 'date' ? setMode('time') : handleClose())}>
                            Next
                        </Button>
                    )}
                </View>
            </Modal>
        </Portal>
    );
};

export default DatePickingModal;
