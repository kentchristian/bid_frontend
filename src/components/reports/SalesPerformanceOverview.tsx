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
import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';
import { ReportActions } from './ReportActions';
import { categoryRevenue, productSales } from './reportData';

export const SalesPerformanceOverview = () => {
  return (
    <CardContainer
      title="Sales Performance Overview"
      customFunction={<ReportActions compact />}
      className="min-h-82 p-4 shadow-sm"
    >
      <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-[0.65fr_1fr_1.25fr]">
        <div className="flex flex-col justify-center gap-8 border-b border-[color:var(--card-border)] pb-5 lg:border-r lg:border-b-0 lg:pr-5 lg:pb-0">
          <div>
            <Typography variant="overline">Total Sales</Typography>
            <Typography variant="h2">$125,450</Typography>
            <Typography
              variant="body-sm"
              className="mt-1 text-[color:var(--accent-positive)]"
            >
              +8.3%
            </Typography>
          </div>
          <div>
            <Typography variant="overline">Products Sold</Typography>
            <Typography variant="h2">15,670</Typography>
          </div>
        </div>

        <div className="min-h-56 border-b border-[color:var(--card-border)] pb-5 lg:border-r lg:border-b-0 lg:pr-5 lg:pb-0">
          <Typography variant="overline">Revenue by Category</Typography>
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie
                data={categoryRevenue}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={78}
                paddingAngle={2}
              >
                {categoryRevenue.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
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
              data={productSales}
              layout="vertical"
              margin={{ top: 12, right: 24, left: 42, bottom: 8 }}
            >
              <XAxis type="number" tickFormatter={(value) => `${value}`} />
              <YAxis
                type="category"
                dataKey="name"
                width={92}
                tick={{ fontSize: 11 }}
              />
              <Tooltip formatter={(value) => [`${value}`, 'Quantity']} />
              <Bar dataKey="quantity" radius={[0, 4, 4, 0]} fill="#4fb286" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CardContainer>
  );
};
