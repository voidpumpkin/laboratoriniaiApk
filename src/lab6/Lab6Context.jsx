import React, { createContext, useState } from 'react';

const Lab6Context = createContext('light');

const Lab6ContextProvider = ({ children }) => {
    const [datePickerState, setDatePickerState] = useState({
        isVisible: false,
        timeDiffrence: null,
    });

    return (
        <Lab6Context.Provider
            value={{
                datePickerState,
                setDatePickerState,
            }}
        >
            {children}
        </Lab6Context.Provider>
    );
};

export { Lab6Context as default, Lab6Context, Lab6ContextProvider };
