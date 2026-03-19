import { icons } from '../../lib/constants/icons';
import { cn } from '../../lib/helpers/cn';
import type { statusQuery } from '../../lib/types/usequery-types';
import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';

interface TotalUnitsSoldCardProps {
  title: string;
  totalUnitsSold: number;
  totalUnitsYesterday: number;
  loading?: boolean;
  status?: statusQuery;
  info?: string;
}

/* A component to visualize if totalUnitsYesterday for units sold is achieved
   To visualize if today's sales was a loss or sucessful
**/
const TotalUnitsSoldCard = ({
  title,
  totalUnitsSold,
  totalUnitsYesterday,
  loading,
  status,
  info,
}: TotalUnitsSoldCardProps) => {
  const trendUp = totalUnitsSold > totalUnitsYesterday;
  const mdArrow = trendUp ? (
    <icons.mdArrowUp color="50C878" size={20} />
  ) : (
    <icons.mdArrowDown color="C85050" size={20} />
  );

  const cornerTrend = trendUp ? (
    <icons.trendUp color="var(--positive-chip-text)" />
  ) : (
    <icons.trendDown color="var(--positive-chip-text)" />
  );

  return (
    <CardContainer
      title={title}
      info={info}
      loading={loading && status === 'pending'}
      customFunction={
        <div
          className={cn(
            'flex h-8 w-8 rounded-full justify-center items-center',
            trendUp ? 'bg-(--accent-positive)' : 'bg-(--accent-negative)',
          )}
        >
          {cornerTrend}
        </div>
      }
      className="flex-1 min-h-40"
    >
      <div className="flex flex-row gap-2 items-center">
        <Typography variant="h1">{totalUnitsSold} items</Typography>
        {mdArrow}
      </div>
    </CardContainer>
  );
};

export default TotalUnitsSoldCard;
