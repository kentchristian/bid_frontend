import { Chip } from '@mui/material';
import { icons } from '../../lib/constants/icons';
import type { statusQuery } from '../../lib/types/usequery-types';
import { getTrendRate } from '../../lib/utils/getTrendRate';
import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';

interface TotalRevenueCardProps {
  title: string;
  totalRevenueToday: number;
  totalRevenueYesterday: number;
  loading?: boolean;
  status?: statusQuery;
}
const TotalRevenueCard = ({
  title,
  totalRevenueToday,
  totalRevenueYesterday,
  loading,
  status,
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

  const content = (
    <>
      <div className="flex flex-row gap-2 items-center">
        <Typography variant="h3">₱ {totalRevenueToday}</Typography>
        {sign}
      </div>

      <div className="flex flex-row">
        <span>{mdArrow}</span>
        <Typography>{trendRate}% vs Yesterday</Typography>
      </div>
    </>
  );

  return (
    <CardContainer
      title={title}
      info="Total Revenue is the total income from today’s sales. The trend shows how it compares to yesterday, indicating growth (↑) or decline (↓)."
      customFunction={
        <Chip
          label={`${trendRate}%`}
          sx={{
            background: trendUp
              ? 'var(--accent-positive)'
              : 'var(--accent-negative)',
            color: 'var(--positive-chip-text)',
          }}
        />
      }
      loading={loading && status === 'pending'}
      className="flex-1"
    >
      {content}
    </CardContainer>
  );
};

export default TotalRevenueCard;
