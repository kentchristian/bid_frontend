import { forwardRef } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Typography } from '../common/Typography';
import {
  categoryRevenue,
  inventoryTurnover,
  lowStockAlerts,
  monthlySalesTrend,
  productSales,
  recentTransactions,
  staffLeaderboard,
} from './reportData';

const generatedAt = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
}).format(new Date());

const totalRevenue = productSales.reduce((sum, item) => sum + item.revenue, 0);
const totalQuantity = productSales.reduce(
  (sum, item) => sum + item.quantity,
  0,
);
const topProduct = productSales[0];

export const ReportContent = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="mx-auto flex w-[960px] flex-col gap-6 bg-white p-8 text-neutral-900 shadow-sm"
      style={{ fontFamily: 'sans-serif' }}
    >
      <header className="border-b border-neutral-200 pb-5">
        <Typography variant="h1">Inventory & Sales BI Report</Typography>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          This report consolidates product movement, revenue distribution,
          monthly sales behavior, inventory health, staff performance, and
          recent transaction activity.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <SummaryBox label="Generated" value={generatedAt} />
          <SummaryBox
            label="Tracked Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
          />
          <SummaryBox
            label="Tracked Units"
            value={totalQuantity.toLocaleString()}
          />
        </div>
      </header>

      <ReportSection
        title="Top-Selling Products"
        description="Shows which products are driving the highest unit movement."
      >
        <div className="h-60 w-[896px]">
          <BarChart
            width={896}
            height={240}
            data={productSales}
            layout="vertical"
            margin={{ top: 12, right: 24, left: 56, bottom: 8 }}
          >
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fontSize: 11 }}
            />
            <Tooltip />
            <Bar dataKey="quantity" name="Units Sold" fill="#4fb286" />
          </BarChart>
        </div>
      </ReportSection>

      <div className="grid grid-cols-2 gap-5">
        <ReportSection
          title="Revenue by Category"
          description="Breaks down revenue share by product category."
        >
          <div className="h-56 w-[438px]">
            <PieChart width={438} height={224}>
              <Pie
                data={categoryRevenue}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={2}
              >
                {categoryRevenue.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              <Legend iconType="circle" />
            </PieChart>
          </div>
        </ReportSection>

        <ReportSection
          title="Monthly Sales Trend"
          description="Compares sales revenue against transaction volume."
        >
          <div className="h-56 w-[438px]">
            <LineChart
              width={438}
              height={224}
              data={monthlySalesTrend}
              margin={{ top: 12, right: 20, left: 0, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#2f7ed8"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="volume"
                name="Volume"
                stroke="#4fb286"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </div>
        </ReportSection>
      </div>

      <ReportSection
        title="Inventory Turnover"
        description="Tracks how efficiently inventory is moving over time."
      >
        <div className="h-52 w-[896px]">
          <LineChart
            width={896}
            height={208}
            data={inventoryTurnover}
            margin={{ top: 12, right: 20, left: 0, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              name="Turnover"
              stroke="#f59f3a"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </div>
      </ReportSection>

      <div className="grid grid-cols-2 gap-5">
        <ReportTable
          title="Staff Performance"
          description="Ranks staff contribution."
          columns={['Staff', 'Transactions', 'Revenue']}
          rows={staffLeaderboard.map((item) => [
            item.name,
            String(item.transactions),
            item.revenue,
          ])}
        />
        <ReportTable
          title="Inventory Health"
          description="Highlights products needing replenishment."
          columns={['Product', 'Current Qty', 'Reorder Point']}
          rows={lowStockAlerts.map((item) => [
            item.name,
            String(item.currentQty),
            String(item.reorderPoint),
          ])}
        />
      </div>

      <ReportTable
        title="Recent Transactions"
        description="Lists the latest sales activity."
        columns={['Transaction', 'Date', 'Created By', 'Items', 'Total']}
        rows={recentTransactions
          .slice(0, 5)
          .map((item) => [
            item.id,
            item.dateTime,
            item.createdBy,
            String(item.items),
            item.total,
          ])}
      />
    </div>
  );
});
ReportContent.displayName = 'ReportContent';

const SummaryBox = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-neutral-200 p-3">
    <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
      {label}
    </p>
    <p className="mt-1 text-sm font-semibold text-neutral-900">{value}</p>
  </div>
);

const ReportSection = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <section className="border border-neutral-200 p-4">
    <Typography variant="h3" className="text-lg">
      {title}
    </Typography>
    <p className="mt-1 text-xs leading-5 text-neutral-600">{description}</p>
    <div className="mt-3">{children}</div>
  </section>
);

const ReportTable = ({
  title,
  description,
  columns,
  rows,
}: {
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
}) => (
  <section className="border border-neutral-200 p-4">
    <Typography variant="h3" className="text-lg">
      {title}
    </Typography>
    <p className="mt-1 text-xs leading-5 text-neutral-600">{description}</p>
    <table className="mt-3 w-full border-collapse text-left text-xs">
      <thead>
        <tr className="border-b border-neutral-200 bg-neutral-50">
          {columns.map((column) => (
            <th key={column} className="p-2 font-semibold text-neutral-600">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.join('-')} className="border-b border-neutral-100">
            {row.map((cell) => (
              <td key={cell} className="p-2 text-neutral-800">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
