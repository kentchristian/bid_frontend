import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CardContainer from '../common/CardContainer';
import { ReportActions } from './ReportActions';
import { monthlySalesTrend } from './reportData';

export const MonthlySalesTrend = () => {
  return (
    <CardContainer
      title="Monthly Sales Trend"
      customFunction={<ReportActions compact />}
      className="min-h-72 p-4 shadow-sm"
    >
      <ResponsiveContainer width="100%" height={245}>
        <LineChart
          data={monthlySalesTrend}
          margin={{ top: 6, right: 18, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 11 }} />
          <YAxis
            yAxisId="revenue"
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => `$${Number(value) / 1000}k`}
          />
          <YAxis
            yAxisId="volume"
            orientation="right"
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => `${Number(value) / 1000}k`}
          />
          <Tooltip
            formatter={(value, name) => [
              name === 'revenue' ? `$${Number(value).toLocaleString()}` : value,
              name === 'revenue' ? 'Daily Sales Revenue' : 'Volume',
            ]}
          />
          <Legend verticalAlign="top" height={28} />
          <Line
            yAxisId="revenue"
            type="monotone"
            dataKey="revenue"
            name="Daily Sales Revenue"
            stroke="#2f7ed8"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="volume"
            type="monotone"
            dataKey="volume"
            name="Volume"
            stroke="#4fb286"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContainer>
  );
};
