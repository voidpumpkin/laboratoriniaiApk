import React from 'react';
import { DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigator from './src/Navigator';
import { Lab6ContextProvider } from './src/lab6/Lab6Context';
import { Lab7ContextProvider } from './src/lab7/Lab7Context';

const theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: '#048BA8',
        accent: '#B3DEC1',
    },
};

const App = () => {
    return (
        <PaperProvider theme={theme}>
            <Lab6ContextProvider>
                <Lab7ContextProvider>
                    <Navigator />
                </Lab7ContextProvider>
            </Lab6ContextProvider>
        </PaperProvider>
    );
};

export default App;
