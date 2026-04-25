import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '../../lib/helpers/cn';
import CardContainer from '../common/CardContainer';

// Sample Data Structure from your BI API
const data = [
  { category: 'Electronics', totalStock: 450 },
  { category: 'Groceries', totalStock: 1200 },
  { category: 'Personal Care', totalStock: 800 },
  { category: 'Home Decor', totalStock: 300 },
  { category: 'Clothing', totalStock: 650 },
];

// Professional Color Palette
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const InventoryByCategory = () => {
  return (
    <CardContainer title="Stock Levels by Category" className={cn('min-h-100')}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical" // Makes it horizontal
          data={data}
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis type="number" hide />{' '}
          {/* Hide XAxis for a cleaner "Progress Bar" look */}
          <YAxis
            dataKey="category"
            type="category"
            width={120}
            height={100}
            tick={{ fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            }}
          />
          <Bar
            dataKey="totalStock"
            radius={[0, 4, 4, 0]} // Rounded corners on the right side
            barSize={20}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </CardContainer>
  );
};

export default InventoryByCategory;
