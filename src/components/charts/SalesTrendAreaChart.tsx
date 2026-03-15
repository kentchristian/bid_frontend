import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { day: 'Mon', sales: 1200 },
  { day: 'Tue', sales: 2100 },
  { day: 'Wed', sales: 800 },
  { day: 'Thu', sales: 1600 },
  { day: 'Fri', sales: 900 },
  { day: 'Sat', sales: 1700 },
  { day: 'Sun', sales: 1300 },
];

const SalesTrendAreaChart = () => {
  return (
    <ResponsiveContainer width="100%" maxHeight={250}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          {/* Gradient for the shadow/fill under the line */}
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />

        {/* Area with line and shadow */}
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#8884d8" // line color
          fill="url(#colorSales)" // gradient fill under the line
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesTrendAreaChart;
