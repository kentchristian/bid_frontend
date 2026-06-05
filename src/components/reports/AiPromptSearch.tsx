import { Button, InputAdornment, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { icons } from '../../lib/constants/icons';
import { Typography } from '../common/Typography';

export const AiPromptSearch = () => {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <TextField
        fullWidth
        size="small"
        value={prompt}
        placeholder='Search or Ask AI Agent... (e.g., "What was the top-selling product last week?")'
        onChange={(event) => setPrompt(event.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: 40,
            backgroundColor: 'var(--card)',
            borderRadius: '6px',
            '& fieldset': {
              borderColor: 'var(--card-border)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--sidebar-muted)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--accent-positive)',
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
                size={17}
                style={{ color: 'var(--sidebar-muted)' }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="AI agent ready" arrow>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                  <icons.bot size={16} />
                </span>
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        startIcon={<icons.filter size={15} />}
        sx={{
          color: 'var(--invert-text)',
          backgroundColor: 'var(--accent-positive)',
          '&:hover': {
            backgroundColor: 'var(--accent-positive-hover)',
            color: 'var(--invert-text)',
          },
          height: 40,
          minWidth: 92,
        }}
      >
        <Typography variant="body-sm">Query</Typography>
      </Button>
    </div>
  );
};
