import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d4af37', 
      dark: '#b4941f',
      light: '#e4cf77'
    },
    secondary: {
      main: '#1a1a1a', 
      light: '#333333',
      dark: '#000000'
    },
    background: {
      default: '#ffffff',
      paper: '#f8f8f8'
    },
    text: {
      primary: '#333333',
      secondary: '#666666'
    }
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: 1
    },
    h2: {
      fontWeight: 600,
      letterSpacing: 0.5
    },
    h3: {
      fontWeight: 600
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 0,
          padding: '10px 24px'
        }
      }
    }
  }
});

export default function App({ Component, pageProps }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '778055347394-21an5p6ptlc41nm24ie12ks53tqdomph.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
