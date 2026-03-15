import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Sample inventory health data
const data = [
  { name: 'Healthy Stocks', value: 120 },
  { name: 'Low Stocks', value: 45 },
  { name: 'Out of Stock', value: 15 },
];

// Define colors for each category
const COLORS = ['#28a745', '#ffc107', '#dc3545']; // green, yellow, red

const InventoryHealthPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} items`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default InventoryHealthPieChart;
