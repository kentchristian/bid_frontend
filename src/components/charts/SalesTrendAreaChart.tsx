import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { SalesTrend } from '../../lib/types/usequery-types';
import { formatUnit } from '../../lib/utils/formatUnit';
import CardContainer from '../common/CardContainer';

interface SalesTrendAreaChartProps {
  loading?: boolean;
  data?: SalesTrend[];
}

const SalesTrendAreaChart = ({ loading, data }: SalesTrendAreaChartProps) => {
  return (
    <CardContainer
      title="Sales Trend (Weekly)"
      info="Displays total sales revenue for the current calendar week (Sunday to Saturday).
  Visualizes daily revenue distribution and highlights fluctuations across the week."
      className="flex-1 min-w-0"
      loading={loading}
    >
      <ResponsiveContainer width="100%" maxHeight={300}>
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
          <XAxis dataKey="day" stroke="var(--main-text)" />
          <YAxis
            tickFormatter={(value) => formatUnit(value, 'PHP')}
            fontSize={15}
            stroke="var(--main-text)"
          />
          <Tooltip />

          {/* Area with line and shadow */}
          <Area
            type="monotone"
            dataKey="sales"
            stroke="var(--accent-positive)" // line color
            fill="rgba(5, 150, 105, 0.15)" // gradient fill under the line
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </CardContainer>
  );
};

export default SalesTrendAreaChart;
