import { Chip } from '@mui/material';
import { icons } from '../../lib/constants/icons';
import { cn } from '../../lib/helpers/cn';
import { getTrendRate } from '../../lib/utils/getTrendRate';
import { Typography } from '../common/Typography';

interface TotalRevenueCardProps {
  title: string;
  totalRevenueToday: number;
  totalRevenueYesterday: number;
}
const TotalRevenueCard = ({
  title,
  totalRevenueToday,
  totalRevenueYesterday,
}: TotalRevenueCardProps) => {
  const trendUp = totalRevenueToday > totalRevenueYesterday;
  const trendRate = getTrendRate(totalRevenueToday, totalRevenueYesterday);

  const sign = trendUp ? (
    <icons.trendUp color="var(--accent-positive)" />
  ) : (
    <icons.trendDown color="var(--accent-negative)" />
  );
  const mdArrow = trendUp ? (
    <icons.mdArrowUp color="var(--accent-positive)" size={20} />
  ) : (
    <icons.mdArrowDown color="var(--accent-negative)" size={20} />
  );

  return (
    <div
      id="overview-card"
      className={cn('flex flex-col gap-2 p-2 flex-1 min-w-0')}
    >
      <div className="flex flex-row justify-between items-center">
        <Typography>{title}</Typography>
        <Chip
          label={`${trendRate}%`}
          sx={{
            background: 'var(--accent-positive)',
            color: 'var(--positive-chip-text)',
          }}
        />
      </div>

      <div className="flex flex-row gap-2 items-center">
        <Typography variant="h3">₱ {totalRevenueToday}</Typography>
        {sign}
      </div>

      <div className="flex flex-row">
        <span>{mdArrow}</span>
        <Typography>{trendRate}%vs Yesterday</Typography>
      </div>
    </div>
  );
};

export default TotalRevenueCard;
