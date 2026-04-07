import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';

// Mock data - replace with your actual API data
const DATA = [
  { name: 'Electronics', value: 2500 },
  { name: 'Apparel', value: 1500 },
  { name: 'Home & Kitchen', value: 1000 },
  { name: 'Software', value: 800 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const RevenueByCategory = () => {
  const loading = false;
  const totalRevenue = DATA.reduce((acc, item) => acc + item.value, 0);

  const overallRevenue = (
    <div className="absolute top-35 z-99">
      <Typography variant="h1" className="font-bold">
        {`$ ${totalRevenue.toLocaleString()}`}
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
      loading={loading}
      className="relative min-h-84 h-84 mt-7"
    >
      <div className="flex flex-col h-full">
        {/* Header Metric */}
        {overallRevenue}

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DATA}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={85}
              paddingAngle={5}
              dataKey="value"
            >
              {DATA.map((entry, index) => (
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
