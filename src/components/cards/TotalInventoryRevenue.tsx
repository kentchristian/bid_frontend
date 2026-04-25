import type { statusQuery } from '../../lib/types/usequery-types';
import { currency } from '../../lib/utils/currency';
import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';

interface TotalInventoryRevenueProps {
  title: string;
  loading?: boolean;
  status?: statusQuery;
  info?: string;
}

/* A component to visualize if dailyTarget for units sold is achieved
   To visualize if today's sales was a loss or sucessful
**/
const TotalInventoryRevenue = ({
  title,
  loading,
  status,
  info,
}: TotalInventoryRevenueProps) => {
  return (
    <CardContainer
      title={title}
      info={info}
      loading={loading && status === 'pending'}
      className="h-40 flex-1 min-w-100"
    >
      <div className="flex flex-col gap-2">
        <Typography variant="h3" className="mt-0.5 text-(--accent-positive)">
          {currency.format(30)}
        </Typography>
        <Typography variant="caption" className="mt-0.5">
          Unit Price * Quantity
        </Typography>
      </div>
    </CardContainer>
  );
};

export default TotalInventoryRevenue;
