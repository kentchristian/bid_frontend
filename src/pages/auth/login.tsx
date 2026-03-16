import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Link } from 'react-router';
import AuthCard from '../../components/common/AuthCard';
import { Typography } from '../../components/common/Typography';

export const Login = () => {
  return (
    <AuthCard title="Login">
      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
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

        <div className="flex items-center justify-between">
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            className="text-gray-600"
          />
          <a href="#" className="text-blue-500 text-sm hover:underline">
            Forgot password?
          </a>
        </div>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="mt-2 py-2"
          fullWidth
        >
          Login
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
