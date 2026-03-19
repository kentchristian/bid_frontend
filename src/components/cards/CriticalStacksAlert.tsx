import { icons } from '../../lib/constants/icons';
import type { statusQuery } from '../../lib/types/usequery-types';
import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';

interface CriticalstacksAlertProps {
  title: string;
  itemsBelowThrehold: number; // for now -- modify later when data exist
  loading?: boolean;
  status?: statusQuery;
  info?: string;
}

/* A component to visualize if dailyTarget for units sold is achieved
   To visualize if today's sales was a loss or sucessful
**/
const CriticalstacksAlert = ({
  title,
  itemsBelowThrehold,
  loading,
  status,
  info,
}: CriticalstacksAlertProps) => {
  const countItems = itemsBelowThrehold;

  const trendUp = countItems > 0; // true means threshold is positive

  return (
    <CardContainer
      title={title}
      info={info}
      customFunction={
        trendUp ? (
          <icons.warning color="var(--accent-warning)" size={30} />
        ) : (
          <icons.check color="var(--accent-positive)" size={30} />
        )
      }
      loading={loading && status === 'pending'}
      className="flex-1 min-h-40"
    >
      <div className="flex flex-row gap-2">
        {trendUp ? (
          <>
            <Typography variant="h3" className="mt-0.5 text-(--accent-warning)">
              {countItems}
            </Typography>
            <Typography variant="h3" className="mt-0.5">
              Items Below Threshold
            </Typography>
          </>
        ) : (
          <Typography variant="h1">0</Typography>
        )}
      </div>
    </CardContainer>
  );
};

export default CriticalstacksAlert;
