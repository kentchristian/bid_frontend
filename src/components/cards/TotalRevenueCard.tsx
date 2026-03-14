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
    <icons.trendUp color="#50C878" />
  ) : (
    <icons.trendDown color="#C85050" />
  );
  const mdArrow = trendUp ? (
    <icons.mdArrowUp color="#50C878" size={20} />
  ) : (
    <icons.mdArrowDown color="#C85050" size={20} />
  );

  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-2 border border-gray-500 rounded-md w-full',
        'shadow-lg shadow-black/20',
        'bg-(--card)',
      )}
    >
      <div className="flex flex-row justify-between items-center">
        <Typography>{title}</Typography>
        <Chip
          label={`${trendRate}%`}
          sx={{
            background: '#50C878',
            color: 'white',
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
