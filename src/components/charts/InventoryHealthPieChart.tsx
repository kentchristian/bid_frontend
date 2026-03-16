import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import CardContainer from '../common/CardContainer';

// Sample inventory health data
const data = [
  { name: 'Healthy Stocks', value: 120 },
  { name: 'Low Stocks', value: 45 },
  { name: 'Out of Stock', value: 15 },
];

// Define colors for each category
const COLORS = ['var(--accent-positive)', '#FFD700', 'var(--accent-negative)']; // green, yellow, red

const InventoryHealthPieChart = () => {
  return (
    <CardContainer
      title="Inventory Health"
      info="Represents the current inventory distribution by stock condition.
Categorizes products into Healthy Stock, Low Stock, and Out of Stock based on reorder thresholds."
      className="flex-1 min-w-0"
    >
      <ResponsiveContainer width="100%" height={300}>
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
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} items`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </CardContainer>
  );
};

export default InventoryHealthPieChart;
