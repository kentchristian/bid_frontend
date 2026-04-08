import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { icons } from '../../lib/constants/icons';

interface SearchBarProps {
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  onChange,
  onClear,
  placeholder = 'Search...',
  className,
}: SearchBarProps) => {
  const [value, setValue] = useState('');
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
        setValue(e.target.value);
      }}
      className={className}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'var(--sidebar-bg)',
          borderRadius: '4px',
          '& fieldset': {
            borderColor: 'var(--card-border)',
          },
          '&:hover fieldset': {
            borderColor: 'var(--accent-primary)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--accent-primary)',
          },
        },
        '& .MuiInputBase-input': {
          color: 'var(--main-text)',
          fontSize: '0.875rem',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <icons.search
              size={18}
              style={{ color: 'var(--accent-primary)' }}
            />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={() => {
                onChange('');
                setValue('');
                onClear?.();
              }}
              sx={{ color: 'var(--accent-negative)', padding: '2px' }}
            >
              <icons.miniClose size={16} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
