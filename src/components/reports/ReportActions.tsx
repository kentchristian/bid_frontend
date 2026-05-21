import { Button, Tooltip } from '@mui/material';
import { icons } from '../../lib/constants/icons';
import { Typography } from '../common/Typography';

interface ReportActionsProps {
  compact?: boolean;
}

export const ReportActions = ({ compact = false }: ReportActionsProps) => {
  const buttonSx = compact
    ? {
        minWidth: 0,
        height: 32,
        px: 1.25,
        color: 'var(--main-text)',
        borderColor: 'var(--card-border)',
        backgroundColor: 'var(--card)',
        '&:hover': {
          borderColor: 'var(--sidebar-muted)',
          backgroundColor: 'var(--sidebar-hover)',
        },
      }
    : {
        height: 40,
        color: 'var(--invert-text)',
        backgroundColor: 'var(--accent-positive)',
        '&:hover': {
          backgroundColor: 'var(--accent-positive-hover)',
          color: 'var(--invert-text)',
        },
      };

  return (
    <div className="flex items-center gap-2">
      <Tooltip title="Download report" arrow>
        <Button
          variant={compact ? 'outlined' : 'contained'}
          startIcon={<icons.download size={15} />}
          sx={buttonSx}
        >
          {!compact && (
            <Typography variant="body-sm">Download Report</Typography>
          )}
        </Button>
      </Tooltip>
      <Tooltip title="Filters" arrow>
        <Button
          variant="outlined"
          startIcon={<icons.filter size={15} />}
          sx={{
            minWidth: compact ? 0 : 88,
            height: compact ? 32 : 40,
            px: compact ? 1.25 : 1.5,
            color: 'var(--main-text)',
            borderColor: 'var(--card-border)',
            backgroundColor: 'var(--card)',
            '&:hover': {
              borderColor: 'var(--sidebar-muted)',
              backgroundColor: 'var(--sidebar-hover)',
            },
          }}
        >
          {!compact && <Typography variant="body-sm">Filters</Typography>}
        </Button>
      </Tooltip>
    </div>
  );
};
