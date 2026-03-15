import { cn } from '../../lib/helpers/cn';
import { Typography } from '../common/Typography';

interface CriticalstacksAlertProps {
  title: string;
  itemsBelowThrehold: string[]; // for now -- modify later when data exist
}

/* A component to visualize if dailyTarget for units sold is achieved
   To visualize if today's sales was a loss or sucessful
**/
const CriticalstacksAlert = ({
  title,
  itemsBelowThrehold,
}: CriticalstacksAlertProps) => {
  const countItems = itemsBelowThrehold.length;

  const trendUp = countItems > 0; // true means threshold is positive

  return (
    <div
      id="overview-card"
      className={cn('flex flex-col gap-2 p-2 flex-1 min-w-0')}
    >
      <div className="flex flex-row justify-between items-center">
        <Typography>{title}</Typography>
        <div
          className={cn(
            'flex h-5 w-5 rounded-full justify-center items-center',
            trendUp ? 'bg-(--accent-negative)' : 'bg-(--accent-positive)',
          )}
        >
          <Typography className="white">{countItems}</Typography>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        {trendUp ? (
          <>
            <Typography variant="h3" className="text-(--accent-negative)">
              {countItems}
            </Typography>
            <Typography variant="h3">Items Below Threshold</Typography>
          </>
        ) : (
          <Typography variant="h3">0</Typography>
        )}
      </div>
    </div>
  );
};

export default CriticalstacksAlert;
