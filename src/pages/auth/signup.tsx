import { Button, TextField } from '@mui/material';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthCard from '../../components/common/AuthCard';
import { Typography } from '../../components/common/Typography';

export const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/auth/login', { replace: true });
  };

  return (
    <AuthCard title="Create account">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField label="Full name" variant="outlined" fullWidth required />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          required
        />
        <TextField
          label="Confirm password"
          variant="outlined"
          fullWidth
          type="password"
          required
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="mt-2 py-2"
          fullWidth
        >
          Create account
        </Button>

        <Typography className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </Typography>
      </form>
    </AuthCard>
  );
};
