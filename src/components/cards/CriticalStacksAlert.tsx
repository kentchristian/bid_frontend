import { icons } from '../../lib/constants/icons';
import CardContainer from '../common/CardContainer';
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
    <CardContainer
      title={title}
      info="coming soon"
      customFunction={
        trendUp ? (
          <icons.warning color="var(--accent-warning)" size={30} />
        ) : (
          <icons.check color="var(--accent-positive)" size={30} />
        )
      }
      className="flex-1"
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
          <Typography variant="h3">0</Typography>
        )}
      </div>
    </CardContainer>
  );
};

export default CriticalstacksAlert;
