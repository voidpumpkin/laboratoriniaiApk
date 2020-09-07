import React, { useState, useContext } from 'react';
import { View, Platform } from 'react-native';
import { Portal, Modal, useTheme, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Lab6Context from './Lab6Context';

const isIos = Platform.OS === 'ios';

const DatePickingModal = () => {
    const { colors } = useTheme();
    const { datePickerState, setDatePickerState } = useContext(Lab6Context);
    const [date, setDate] = useState(new Date());
    const isDateModalVisible = datePickerState.isVisible;

    const handleDismiss = () => {
        setDatePickerState((oldState) => ({
            ...oldState,
            isVisible: false,
        }));
    };

    const handleClose = (selectedDate = date) => {
        const diff = Math.abs(selectedDate - new Date());
        const timeDiffrence = Math.floor(diff / 1000 / 60);
        setDatePickerState((oldState) => ({
            ...oldState,
            timeDiffrence,
            isVisible: false,
        }));
    };

    const onChange = (event, selectedDate) => {
        if (!selectedDate) {
            handleDismiss();
            return;
        }
        if (!isIos) handleClose(selectedDate);
        setDate(selectedDate);
    };

    return (
        <Portal>
            {isIos ? (
                <Modal visible={isDateModalVisible} onDismiss={handleDismiss}>
                    <View
                        style={{
                            backgroundColor: colors.surface,
                            marginHorizontal: 30,
                            padding: 20,
                        }}
                    >
                        <DateTimePicker
                            value={date}
                            mode="time"
                            onChange={onChange}
                            textColor={colors.onBackground}
                        />
                        <Button onPress={() => handleClose()}>Save</Button>
                    </View>
                </Modal>
            ) : (
                isDateModalVisible && (
                    <DateTimePicker value={date} mode="time" onChange={onChange} />
                )
            )}
        </Portal>
    );
};

export default DatePickingModal;
