import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Divider
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, googleLogin } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setError('No credential received');
      return;
    }
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const result = await googleLogin(decoded);
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Google sign in failed');
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google login error:', error);
    setError('Google sign in failed');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom>
          Sign In
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              color: 'black',
              borderColor: 'black',
              '&:hover': {
                backgroundColor: 'black',
                color: 'white',
                borderColor: 'black'
              }
            }}
          >
            Sign In
          </Button>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              login_uri={typeof window !== 'undefined' ? window.location.origin : ''}
              auto_select={false}
            />
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <NextLink href="/register" passHref legacyBehavior>
              <Link variant="body2">
                Don't have an account? Sign Up
              </Link>
            </NextLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
