import React from 'react';

// MUI imports
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Local import
import theme from './theme.js';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const useColorMode = () => {
    const context = React.useContext(ColorModeContext);
    if (!context) {
        throw new Error('useColorMode must be used within a ColorModeProvider');
    }
    return context;
};

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = React.useState( window.location.pathname.includes('api-documentation') ? 'dark' : 'light');

    const colorMode = React.useMemo(() => ({ toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
    }}), []);

    const t = React.useMemo(() => theme({ mode }), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={t}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};