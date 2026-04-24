import { useMemo } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useOverallRevenue } from '../../lib/hooks/useSales';
import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';

// Mock data - replace with your actual API data

const COLORS: string[] = [];

export const RevenueByCategory = () => {
  const {
    data: overallRevenue,
    isLoading: overallRevenueLoading,
    status: overallRevenueStatus,
    isRefetching: overallRevenueRefetching,
  } = useOverallRevenue();

  const revenueByCategory = useMemo(() => {
    if (!overallRevenue) {
      return [];
    }

    // MAP COLORS

    return overallRevenue?.revenues_by_category?.map((item) => {
      COLORS.push(item?.inventory__category__color ?? '#0088FE'); // #0088FE default color
      return {
        name: item?.inventory__category__name ?? 'Unknown',
        value: item?.overall_total ?? 0,
      };
    });
  }, [overallRevenue]);

  const totalRevenue = overallRevenue?.overall_revenue;

  const totalSales = (
    <div className="absolute top-35 z-99">
      <Typography variant="h1" className="font-bold">
        {`$ ${totalRevenue?.toLocaleString()}`}
      </Typography>
      <Typography variant="body" className="text-gray-500">
        Total Sales
      </Typography>
    </div>
  );

  return (
    <CardContainer
      title="Overall Revenue"
      info="Revenue breakdown by product category"
      loading={
        (overallRevenueLoading && overallRevenueStatus === 'pending') ||
        overallRevenueRefetching
      }
      className="relative min-h-84 h-84 mt-7"
    >
      <div className="flex flex-col h-full">
        {/* Header Metric */}
        {totalSales}

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={revenueByCategory}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={85}
              paddingAngle={5}
              dataKey="value"
            >
              {revenueByCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => {
                if (value === undefined || value === null)
                  return ['$0', 'Revenue'];

                const numericValue = Number(value);
                return [`$${numericValue.toLocaleString()}`, 'Revenue'];
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardContainer>
  );
};
