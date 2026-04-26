import CardContainer from './CardContainer';
import { Typography } from './Typography';

interface InventoryKPICountProps {
  title: string;
  loading?: boolean;
  info?: string;
  data?: string | number;
  caption?: string;
}

/* A component to visualize if dailyTarget for units sold is achieved
   To visualize if today's sales was a loss or sucessful
**/
const InventoryKPICount = ({
  title,
  loading,
  info,
  data,
  caption,
}: InventoryKPICountProps) => {
  return (
    <CardContainer
      title={title}
      info={info}
      loading={loading}
      className="h-40 flex-1 min-w-100"
    >
      <div className="flex flex-col gap-2">
        <Typography variant="h1" className="mt-2 text-(--accent-positive)">
          {data}
        </Typography>
        <Typography variant="caption" className="mt-10">
          {caption}
        </Typography>
      </div>
    </CardContainer>
  );
};

export default InventoryKPICount;
