import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    const toggleTheme = () => {
        setDarkModeEnabled((prevMode) => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ darkModeEnabled, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);