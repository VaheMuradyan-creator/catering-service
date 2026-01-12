import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import OrderForm from './pages/OrderForm';
import Contact from './pages/Contact';
import Catering from './pages/Catering';
import About from './pages/About';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRoute from './components/PrivateRoute';

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
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px'
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }
      }
    }
  }
});

function App() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '778055347394-21an5p6ptlc41nm24ie12ks53tqdomph.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider 
        clientId={clientId}
        onScriptLoadError={(error) => {
          console.error('Google Script Error:', error);
          console.error('Full error details:', JSON.stringify(error, null, 2));
        }}
        onScriptLoadSuccess={() => {
          console.log('Google Script Loaded Successfully');
          console.log('Client ID:', clientId);
        }}
      >
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/catering" element={<Catering />} />
              <Route 
                path="/order/:id" 
                element={
                  <PrivateRoute>
                    <OrderForm />
                  </PrivateRoute>
                } 
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
