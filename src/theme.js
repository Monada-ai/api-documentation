import { createTheme } from '@mui/material/styles';

const theme = ({ mode }) => createTheme({
    palette: {
        mode,
        background: {
            default: mode === 'dark' ? '#151515' : '#fafbfc',
            paper: mode === 'dark' ? 'black' : 'white',
        },
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
});

export default theme;