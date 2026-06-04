import { Button, Tooltip } from '@mui/material';
import { useState } from 'react';
import { icons } from '../../lib/constants/icons';
import { Typography } from '../common/Typography';
import { ReportPreviewModal } from './ReportPreviewModal';

interface ReportActionsProps {
  compact?: boolean;
}

export const ReportActions = ({ compact = false }: ReportActionsProps) => {
  const [reportPreviewOpen, setReportPreviewOpen] = useState(false);

  const handlePreviewOpen = () => {
    setReportPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setReportPreviewOpen(false);
  };

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
    <>
      <div className="flex items-center gap-2">
        <Tooltip title="Preview report" arrow>
          <Button
            variant="outlined"
            startIcon={<icons.show size={15} />}
            onClick={handlePreviewOpen}
            sx={{
              ...buttonSx,
              minWidth: compact ? 0 : 96,
              color: 'var(--main-text)',
              borderColor: 'var(--card-border)',
              backgroundColor: 'var(--card)',
            }}
          >
            {!compact && <Typography variant="body-sm">Preview</Typography>}
          </Button>
        </Tooltip>
        <Tooltip title="Download report" arrow>
          <Button
            variant={compact ? 'outlined' : 'contained'}
            startIcon={<icons.download size={15} />}
            onClick={handlePreviewOpen}
            sx={buttonSx}
          >
            {!compact && (
              <Typography variant="body-sm">Download Report</Typography>
            )}
          </Button>
        </Tooltip>
      </div>

      <ReportPreviewModal
        open={reportPreviewOpen}
        onClose={handlePreviewClose}
      />
    </>
  );
};
