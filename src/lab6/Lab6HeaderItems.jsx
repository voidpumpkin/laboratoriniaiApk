import React, { useContext } from 'react';
import { Colors, IconButton, Text } from 'react-native-paper';
import ViewMenu from './ViewMenu';
import Lab6Context from './Lab6Context';
import { BackHandler, Platform } from 'react-native';

const isIos = Platform.OS === 'ios';

const Lab6HeaderItems = () => {
    const { setDatePickerState } = useContext(Lab6Context);

    const handleDateDiffPress = (i) => {
        if (i !== 0) {
            return;
        }
        setDatePickerState((oldState) => ({
            ...oldState,
            isVisible: true,
        }));
    };

    return (
        <>
            <ViewMenu
                items={['Valandu skirtumas']}
                onItemPress={handleDateDiffPress}
                openOnClick={false}
                anchor={(props) => <Text {...props}>Nustatyti skirtuma</Text>}
            />
            {!isIos && (
                <ViewMenu
                    items={['Baigti darba']}
                    onItemPress={() => {
                        BackHandler.exitApp();
                    }}
                    openOnClick={false}
                    anchor={(props) => (
                        <IconButton
                            icon="dots-vertical"
                            color={Colors.white}
                            onPress={props.onPress}
                        />
                    )}
                />
            )}
        </>
    );
};

export default Lab6HeaderItems;
