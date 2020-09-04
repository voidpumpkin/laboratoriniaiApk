import React from 'react';
import { DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigator from './src/Navigator';

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
            <Navigator />
        </PaperProvider>
    );
};

export default App;
