import { Skeleton } from '@mui/material'; // Assuming MUI based on your sx prop usage

import { Typography } from '../common/Typography';

import { cn } from '../../lib/helpers/cn';

interface SummaryTileProps {
  label: string;
  value: string;
  sub: string;
  loading?: boolean;
}
const SummaryTile = ({ label, value, sub, loading }: SummaryTileProps) => (
  <div className="flex-1 border border-(--card-border) p-4 rounded-sm bg-[color:var(--sidebar-bg)] shadow-sm">
    {loading && (
      <Skeleton
        variant="rectangular"
        className={cn('w-full h-full flex-1 rounded-xl min-w-50 min-h-15')}
      />
    )}

    {!loading && (
      <>
        <Typography
          variant="caption"
          className="text-gray-500 uppercase tracking-wider font-bold"
        >
          {label}
        </Typography>
        <Typography variant="h2" className="mt-1">
          {value}
        </Typography>
        <Typography
          variant="caption"
          className="text-[color:var(--accent-primary)]"
        >
          {sub}
        </Typography>
      </>
    )}
  </div>
);

export default SummaryTile;
