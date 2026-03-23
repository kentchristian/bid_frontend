import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';

import { Link, useLocation, useNavigate } from 'react-router';
import { login } from '../../api/auth';
import AuthCard from '../../components/common/AuthCard';
import { Typography } from '../../components/common/Typography';
import { guestEmail, guestPassword } from '../../config/global-config';
import { icons } from '../../lib/constants/icons';
import { useMiddleware } from '../../middleware/MiddlewareProvider';

type LocationState = {
  from?: { pathname: string };
};

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthenticated } = useMiddleware();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const sxTextField = {
    backgroundColor: 'var(--main-bg)',
    input: { color: 'var(--sidebar-text)' },
    label: { color: 'var(--sidebar-text)' }, // Optional: changes the label color too
    '& .MuiOutlinedInput-root': {
      // normal
      '& fieldset': {
        borderColor: 'var(--sidebar-text)',
      },
      // hover
      '&:hover fieldset': {
        borderColor: 'blue',
      },
      // focused
      '&.Mui-focused fieldset': {
        borderColor: 'blue',
      },
    },
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setAuthenticated(true, { remember: rememberMe });
      const from =
        (location.state as LocationState | null)?.from?.pathname ??
        '/dashboard';
      navigate(from, { replace: true });
    },
    onError: () => {
      setFormError(
        'Login failed. Please check your credentials and try again.',
      );
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    loginMutation.mutate({ email: email.trim(), password });
  };

  const handleSignAsGuest = () => {
    event?.preventDefault();
    setFormError(null);
    loginMutation.mutate({ email: guestEmail, password: guestPassword });
  };

  return (
    <AuthCard title="Login">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          sx={sxTextField}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={sxTextField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? (
                    <div className="text-(--sidebar-text)">
                      <icons.visbilityOn />
                    </div>
                  ) : (
                    <div className="text-(--sidebar-text)">
                      <icons.visibilityOff />
                    </div>
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <div className="flex items-center justify-between">
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe} // if checked authentication true has 30 days ttl
                onChange={(event) => setRememberMe(event.target.checked)}
              />
            }
            label="Remember me"
            className="text-gray-600"
          />
          <a href="#" className="var(--sidebar-text) text-sm hover:underline ">
            Forgot password?
          </a>
        </div>

        {formError ? (
          <Typography className="text-sm text-red-600">{formError}</Typography>
        ) : null}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="mt-2 py-2"
          fullWidth
          disabled={loginMutation.isPending}
          loading={loginMutation.isPending}
        >
          Login
        </Button>

        <Button variant="text" onClick={handleSignAsGuest}>
          <Typography className="text-center text-sm text-blue-500 hover:underline hover:cursor-pointer">
            Sign in as Guest
          </Typography>
        </Button>

        <Typography className="text-center text-gray-500 text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </Typography>
      </form>
    </AuthCard>
  );
};
