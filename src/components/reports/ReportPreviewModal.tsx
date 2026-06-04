import { Button, CircularProgress, Dialog } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef, useState } from 'react';
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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { icons } from '../../lib/constants/icons';
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

type ReportPreviewModalProps = {
  open: boolean;
  onClose: () => void;
};

const generatedAt = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
}).format(new Date());

const totalRevenue = productSales.reduce((sum, item) => sum + item.revenue, 0);
const totalQuantity = productSales.reduce((sum, item) => sum + item.quantity, 0);
const topProduct = productSales[0];

export const ReportPreviewModal = ({
  open,
  onClose,
}: ReportPreviewModalProps) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReport = async () => {
    if (!reportRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;
      const imageData = canvas.toDataURL('image/png');

      let heightLeft = imageHeight;
      let position = 0;

      pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imageHeight;
        pdf.addPage();
        pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`inventory-sales-bi-report-${Date.now()}.pdf`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          height: '92vh',
          color: 'var(--main-text)',
          backgroundColor: 'var(--card)',
        },
      }}
    >
      <div className="flex items-center justify-between border-b border-[color:var(--card-border)] px-5 py-4">
        <div>
          <Typography variant="h3">Report Preview</Typography>
          <Typography
            variant="body-sm"
            className="text-[color:var(--sidebar-muted)]"
          >
            Inventory & Sales BI report PDF
          </Typography>
        </div>
        <Button
          onClick={onClose}
          sx={{
            minWidth: 0,
            color: 'var(--main-text)',
            borderColor: 'var(--card-border)',
          }}
          variant="outlined"
        >
          <icons.close size={18} />
        </Button>
      </div>

      <div className="flex-1 overflow-auto bg-neutral-100 p-5">
        <div
          ref={reportRef}
          className="mx-auto flex w-full max-w-[960px] flex-col gap-6 bg-white p-8 text-neutral-900 shadow-sm"
        >
          <header className="border-b border-neutral-200 pb-5">
            <Typography variant="h1">Inventory & Sales BI Report</Typography>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
              This report consolidates product movement, revenue distribution,
              monthly sales behavior, inventory health, staff performance, and
              recent transaction activity into one operational snapshot.
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
            description="Shows which products are driving the highest unit movement. This helps identify demand leaders, replenishment priorities, and products that may need stronger stock planning."
          >
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
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
              </ResponsiveContainer>
            </div>
          </ReportSection>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ReportSection
              title="Revenue by Category"
              description="Breaks down revenue share by product category, making it easier to see which departments contribute most to overall sales."
            >
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
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
                </ResponsiveContainer>
              </div>
            </ReportSection>

            <ReportSection
              title="Monthly Sales Trend"
              description="Compares sales revenue against transaction volume across the month to surface demand spikes, slow periods, and conversion patterns."
            >
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
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
                </ResponsiveContainer>
              </div>
            </ReportSection>
          </div>

          <ReportSection
            title="Inventory Turnover"
            description="Tracks how efficiently inventory is moving over time. Higher turnover generally suggests healthier product flow and lower holding risk."
          >
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
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
              </ResponsiveContainer>
            </div>
          </ReportSection>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ReportTable
              title="Staff Performance"
              description="Ranks staff by transaction and revenue contribution."
              columns={['Staff', 'Transactions', 'Revenue']}
              rows={staffLeaderboard.map((item) => [
                item.name,
                String(item.transactions),
                item.revenue,
              ])}
            />
            <ReportTable
              title="Inventory Health"
              description="Highlights products that may need replenishment review."
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
            description="Lists the latest sales activity to support reconciliation and operational review."
            columns={['Transaction', 'Date', 'Created By', 'Items', 'Total']}
            rows={recentTransactions.slice(0, 5).map((item) => [
              item.id,
              item.dateTime,
              item.createdBy,
              String(item.items),
              item.total,
            ])}
          />

          <section className="border-t border-neutral-200 pt-5">
            <Typography variant="h3">Insights</Typography>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <InsightItem
                title="Demand signal"
                body={`${topProduct.name} currently leads tracked product sales with ${topProduct.quantity.toLocaleString()} units sold.`}
              />
              <InsightItem
                title="Revenue concentration"
                body="Category contribution should be monitored for over-reliance on a small number of departments."
              />
              <InsightItem
                title="AI insight placeholder"
                body="Future AI-generated commentary can be inserted here for anomalies, opportunities, and recommended actions."
              />
            </div>
          </section>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-[color:var(--card-border)] px-5 py-4">
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            color: 'var(--main-text)',
            borderColor: 'var(--card-border)',
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          onClick={handleDownloadReport}
          disabled={isDownloading}
          startIcon={
            isDownloading ? (
              <CircularProgress size={14} color="inherit" />
            ) : (
              <icons.download size={15} />
            )
          }
          sx={{
            color: 'var(--invert-text)',
            backgroundColor: 'var(--accent-positive)',
            '&:hover': {
              backgroundColor: 'var(--accent-positive-hover)',
            },
          }}
        >
          Download Report
        </Button>
      </div>
    </Dialog>
  );
};

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

const InsightItem = ({ title, body }: { title: string; body: string }) => (
  <div className="border border-neutral-200 bg-neutral-50 p-3">
    <p className="text-xs font-semibold text-neutral-900">{title}</p>
    <p className="mt-1 text-xs leading-5 text-neutral-600">{body}</p>
  </div>
);
