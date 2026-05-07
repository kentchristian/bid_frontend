import { CircularProgress, OutlinedInput } from '@mui/material';

export const DropDownProps = (loading: boolean) => ({
  IconComponent: loading ? () => null : undefined,
  input: (
    <OutlinedInput
      endAdornment={
        loading ? (
          <CircularProgress color="inherit" size={20} sx={{ mr: 2 }} />
        ) : null
      }
    />
  ),
  loading: loading,
});
