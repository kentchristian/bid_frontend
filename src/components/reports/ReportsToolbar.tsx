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
        <ReportActions />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <AiPromptSearch />
      </div>
    </div>
  );
};
