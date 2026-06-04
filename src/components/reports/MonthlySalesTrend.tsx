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

import { useMonthlySalesTrendReport } from '../../lib/hooks/useReports';
import { formatCurrency } from '../../lib/utils/formatCurrency';
import { formatLongDate } from '../../lib/utils/formatLongDate';
import CardContainer from '../common/CardContainer';
import { ReportActions } from './ReportActions';

export const MonthlySalesTrend = () => {
  const filterData = {
    year: 2026,
    month: 4,
  };

  const {
    data: monthlySalesTrendData,
    isLoading: monthlySalesTrendLoading,
    status: monthlySalesTrendStatus,
  } = useMonthlySalesTrendReport(filterData);

  const chartData = monthlySalesTrendData ?? [];

  return (
    <CardContainer
      loading={
        monthlySalesTrendLoading && monthlySalesTrendStatus === 'pending'
      }
      title="Monthly Sales Trend"
      customFunction={<ReportActions compact />}
      className="min-h-72 p-4 shadow-sm"
      isEmpty={chartData.length === 0}
    >
      <ResponsiveContainer width="100%" height={245}>
        <LineChart
          data={chartData}
          margin={{ top: 6, right: 18, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="day"
            tick={{ fontSize: 11 }}
            tickFormatter={formatLongDate}
          />

          <YAxis
            yAxisId="daily_revenue"
            tick={{ fontSize: 11 }}
            tickFormatter={formatCurrency}
          />

          <YAxis
            yAxisId="transaction_volume"
            orientation="right"
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => String(value)}
          />

          <Tooltip
            labelFormatter={formatLongDate}
            formatter={(value, name) => [
              name === 'Daily Sales Revenue'
                ? formatCurrency(value as number | string)
                : value,
              name,
            ]}
          />

          <Legend verticalAlign="top" height={28} />

          <Line
            yAxisId="daily_revenue"
            type="monotone"
            dataKey="daily_revenue"
            name="Daily Sales Revenue"
            stroke="#2f7ed8"
            strokeWidth={2}
            dot={false}
          />

          <Line
            yAxisId="transaction_volume"
            type="monotone"
            dataKey="transaction_volume"
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
