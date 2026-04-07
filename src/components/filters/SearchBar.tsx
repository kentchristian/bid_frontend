import { IconButton, InputAdornment, TextField } from '@mui/material';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className,
}: SearchBarProps) => {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
            <FiSearch size={18} style={{ color: 'var(--accent-primary)' }} />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={() => {
                onChange('');
                onClear?.();
              }}
              sx={{ color: 'var(--accent-negative)', padding: '2px' }}
            >
              <FiX size={16} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
