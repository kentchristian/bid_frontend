import { Button, Tooltip } from '@mui/material';
import { icons } from '../../lib/constants/icons';
import { Typography } from '../common/Typography';
import { AiPromptSearch } from './AiPromptSearch';
import { ReportActions } from './ReportActions';

export const ReportsToolbar = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-64">
          <Typography variant="h3">Inventory & Sales BI Reports</Typography>
          <Typography
            variant="body-sm"
            className="text-[color:var(--sidebar-muted)]"
          >
            Executive sales, stock health, staff, and transaction intelligence.
          </Typography>
        </div>

        <AiPromptSearch />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Tooltip title="Current reporting range" arrow>
          <Button
            variant="outlined"
            startIcon={<icons.calendar size={16} />}
            sx={{
              height: 40,
              justifyContent: 'flex-start',
              color: 'var(--main-text)',
              borderColor: 'var(--card-border)',
              backgroundColor: 'var(--card)',
              '&:hover': {
                borderColor: 'var(--sidebar-muted)',
                backgroundColor: 'var(--sidebar-hover)',
              },
            }}
          >
            <Typography variant="body-sm">Oct 1 - Oct 31, 2023</Typography>
          </Button>
        </Tooltip>
        <ReportActions />
      </div>
    </div>
  );
};
