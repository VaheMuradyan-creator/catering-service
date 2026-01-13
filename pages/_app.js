import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '../context/AuthContext';
// import Navbar from '../components/Navbar'; // Using TubelightNavbar instead
import '../styles/globals.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d4af37', 
      dark: '#b4941f',
      light: '#e4cf77'
    },
    secondary: {
      main: '#0a4d68', 
      light: '#1a5f7a',
      dark: '#0a1929'
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff'
    },
    text: {
      primary: '#1a5f7a',
      secondary: '#6b6b6b'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
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
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
