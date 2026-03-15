import { icons } from '../../lib/constants/icons';
import { cn } from '../../lib/helpers/cn';
import { Typography } from '../common/Typography';

interface TotalUnitsSoldCardProps {
  title: string;
  totalUnitsSold: number;
  dailyTarget: number;
}

/* A component to visualize if dailyTarget for units sold is achieved
   To visualize if today's sales was a loss or sucessful
**/
const TotalUnitsSoldCard = ({
  title,
  totalUnitsSold,
  dailyTarget,
}: TotalUnitsSoldCardProps) => {
  const trendUp = totalUnitsSold > dailyTarget;
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
    <div
      id="overview-card"
      className={cn('flex flex-col gap-2 p-2 flex-1 min-w-0')}
    >
      <div className="flex flex-row justify-between items-center">
        <Typography>{title}</Typography>
        <div
          className={cn(
            'flex h-8 w-8 rounded-full justify-center items-center',
            trendUp ? 'bg-(--accent-positive)' : 'bg-(--accent-negative)',
          )}
        >
          {cornerTrend}
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <Typography variant="h3">{totalUnitsSold} items</Typography>
        {mdArrow}
      </div>
    </div>
  );
};

export default TotalUnitsSoldCard;
