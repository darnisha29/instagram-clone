import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#f93880',
      light: '#9626bf'
    },
    secondary: {
      main: '#F2EFE9',
      light: '#FFBC42'
    },
    common: {
      black: '#000000',
      white: '#FFFFFF'
    },
    text: {
      primary: '#000000',
      secondary: '#828282',
      disabled: '#b0b0b0'
    },
    divider: 'rgba(242,242,242,1)',
    grey: {
      50: '#ffffff',
      100: '#efefef',
      200: '#cccccc',
      300: '#BDBDBD',
      500: '#828282',
      600: '#4F4F4F',
      700: '#333333',
      800: '#F2F2F2',
      900: '#FBF4F9',
      A100: '#2F3437',
      A200: '#F0F4F8',
      A400: '#EBEFF4',
      A700: '#3D525E'
    },
    background: {
      default: '#F1F1F1',
      paper: '#FFFFFF'
    },
    error: {
      main: '#FD3A69',
      light: '#ECD5D2',
      dark: '#F24E1E',
      100: '#F0E4E3'
    },
    success: {
      main: '#63B161',
      light: '#63B1611A',
      dark: '#2CC585',
      100: '#DCF0ED',
      200: '#E1F1F0',
      300: '#59C685'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontWeight: 'bold',
      fontSize: '24px',
      color: 'text.primary'
    },
    h2: {
      fontWeight: 'bold',
      fontSize: '20px',
      color: 'text.primary'
    },
    h3: {
      fontWeight: 'bold',
      fontSize: '16px',
      color: 'text.primary'
    },
    h4: {
      fontWeight: 'normal',
      fontSize: '1rem',
      color: 'text.primary'
    },

    body1: {
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '20px'
    },
    body2: {
      fontWeight: 'normal',
      fontSize: 16,
      lineHeight: '22px'
    }
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'Inter'
          // scrollbarColor: '#6b6b6b #2b2b2b',
          // '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          //   background: 'rgba(255,255,255,0.04)',
          //   width: '4px',
          //   height: '4px'
          // },
          // '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          //   borderRadius: '50px',
          //   background: `-webkit-linear-gradient(107.73deg, #8438BF 0%, #D81F5A 100%)`,
          //   minHeight: '4px',
          //   minWidth: '4px'
          // },
          // '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
          //   background: `linear-gradient(107.73deg, #C81F59 0%, #7232A7 100%)`
          // },
          // '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
          //   background: `linear-gradient(107.73deg, #C81F59 0%, #7232A7 100%)`
          // },
          // '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
          //   background: `linear-gradient(107.73deg, #C81F59 0%, #7232A7 100%)`
          // },
          // '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
          //   background: `linear-gradient(107.73deg, #C81F59 0%, #7232A7 100%)`
          // }
        }
      }
    }
  }
})

export default theme
