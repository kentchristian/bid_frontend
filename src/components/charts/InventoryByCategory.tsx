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
import type { IventoryByCategoryType } from '../../lib/types/usequery-types';
import { currency } from '../../lib/utils/currency';
import CardContainer from '../common/CardContainer';

interface InventoryByCategory {
  data: IventoryByCategoryType[];
  loading: boolean;
}

const InventoryByCategory = ({ data, loading }: InventoryByCategory) => {
  return (
    <CardContainer
      loading={loading}
      title="Stock Levels by Category"
      className={cn('min-h-100')}
    >
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          layout="vertical"
          data={data ?? []}
          margin={{ top: 5, right: 40, left: 40, bottom: 20 }} // Increased bottom margin for XAxis labels
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={true} // Enabled vertical lines to act as a scale/grid
            stroke="var(--main-bg)"
          />

          {/* The Basis/Range: Unhidden but styled subtly */}
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: 'var(--main-text)' }} // Gray-400 color
            axisLine={true}
            tickLine={true}
            tickFormatter={(value) => value.toLocaleString()} // Formats numbers like 1,000
            stroke={'var(--main-text)'}
          />

          <YAxis
            dataKey="category__name"
            type="category"
            width={120}
            tick={{ fontSize: 12, fontWeight: 500, fill: 'var(--main-text)' }}
            axisLine={true}
            tickLine={false}
            stroke={'var(--main-text)'}
          />

          <Tooltip
            cursor={{ fill: '#f3f4f6', opacity: 0.4 }} // Slight highlight on hover
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            }}
            formatter={(value, _name, props) => {
              const itemsTotal = Number(value);
              const barColor = props.payload.category__color || '#6366f1';
              const stockValudation = props.payload?.item_valuation || 0;

              return [
                <div className="flex flex-col">
                  <text style={{ color: barColor }}>
                    Total Stocks: {itemsTotal.toLocaleString()}
                  </text>
                  <text style={{ color: barColor }}>
                    {`Item Valuation: ${currency.format(stockValudation)}`}
                  </text>
                </div>,
              ];
            }}
          />

          <Bar
            dataKey="total_inventory_items"
            radius={[0, 4, 4, 0]}
            barSize={20}
          >
            {data.map((item, index) => (
              <Cell
                key={`cell-${index}`}
                fill={item?.category__color || '#6366f1'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </CardContainer>
  );
};

export default InventoryByCategory;
