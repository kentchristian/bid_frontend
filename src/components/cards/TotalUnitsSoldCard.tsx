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
    <icons.trendUp color="white" />
  ) : (
    <icons.trendDown color="white" />
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
        <div
          className={cn(
            'flex h-5 w-5 rounded-full justify-center items-center',
            trendUp ? 'bg-[#50C878]' : 'bg-[#C85050]',
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
