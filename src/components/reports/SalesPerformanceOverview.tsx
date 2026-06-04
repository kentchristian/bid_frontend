import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useSalesPerformanceOverview } from '../../lib/hooks/useReports';
import { currency } from '../../lib/utils/currency';
import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';

export const SalesPerformanceOverview = () => {
  const {
    data: salesPerformanceData,
    isLoading: salesPerformanceLoading,
    status: salesPerformanceLoadingStatus,
    // isRefetching: transactionHistoryRefetching,
  } = useSalesPerformanceOverview();

  return (
    <CardContainer
      title="Sales Performance Overview"
      // customFunction={<ReportActions compact />}
      className="min-h-82 p-4 shadow-sm"
      loading={
        salesPerformanceLoading && salesPerformanceLoadingStatus === 'pending'
      }
    >
      <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-[0.65fr_1fr_1.25fr]">
        <div className="flex flex-col justify-center gap-8 border-b border-[color:var(--card-border)] pb-5 lg:border-r lg:border-b-0 lg:pr-5 lg:pb-0">
          <div>
            <Typography variant="overline">Total Sales</Typography>
            <Typography variant="h2">
              {currency.format(
                Number(salesPerformanceData?.totals?.sales_revenue),
              )}
            </Typography>
            {/* <Typography
              variant="body-sm"
              className="mt-1 text-[color:var(--accent-positive)]"
            >
              +8.3%
            </Typography> */}
          </div>
          <div>
            <Typography variant="overline">Products Sold</Typography>
            <Typography variant="h2">
              {salesPerformanceData?.totals?.total_items}
            </Typography>
          </div>
        </div>

        <div className="min-h-56 border-b border-[color:var(--card-border)] pb-5 lg:border-r lg:border-b-0 lg:pr-5 lg:pb-0">
          <Typography variant="overline">Revenue by Category</Typography>
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie
                data={salesPerformanceData?.revenues_by_category}
                dataKey="overall_total"
                nameKey="inventory__category__name"
                innerRadius={50}
                outerRadius={78}
                paddingAngle={2}
              >
                {salesPerformanceData?.revenues_by_category.map((entry) => (
                  <Cell
                    key={entry.inventory__category__name}
                    fill={entry.inventory__category__color}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(overall_total) => [`${overall_total}%`, 'Share']}
              />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="min-h-56">
          <Typography variant="overline">Top-Selling Products</Typography>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={salesPerformanceData?.five_top_selling_products}
              layout="vertical"
              margin={{ top: 12, right: 24, left: 42, bottom: 8 }}
            >
              <XAxis
                type="number"
                tickFormatter={(total_quantity) => `${total_quantity}`}
              />
              <YAxis
                type="category"
                dataKey="inventory__product_name"
                width={92}
                tick={{ fontSize: 11 }}
                tickFormatter={(value) =>
                  value && value.length > 15
                    ? `${value.substring(0, 15)}...`
                    : value
                }
              />
              <Tooltip
                formatter={(total_quantity) => [
                  `${total_quantity}`,
                  'Quantity',
                ]}
              />
              <Bar
                dataKey="total_quantity"
                radius={[0, 4, 4, 0]}
                fill="#4fb286"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CardContainer>
  );
};
