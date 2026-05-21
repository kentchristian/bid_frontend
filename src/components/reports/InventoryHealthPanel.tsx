import { Button, Tooltip } from '@mui/material';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { icons } from '../../lib/constants/icons';
import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';
import { inventoryTurnover, lowStockAlerts } from './reportData';

const statusChips = [
  {
    label: 'Healthy',
    className:
      'border-[color:var(--accent-positive)] bg-emerald-50 text-[color:var(--accent-positive)]',
  },
  {
    label: 'Low',
    className: 'border-amber-400 bg-amber-50 text-amber-700',
  },
  {
    label: 'Out',
    className: 'border-[color:var(--accent-negative)] bg-red-50 text-red-600',
  },
];

export const InventoryHealthPanel = () => {
  return (
    <CardContainer title="Inventory Health" className="min-h-96 p-4 shadow-sm">
      <div className="flex h-full flex-col gap-5">
        <section>
          <Typography variant="overline">Stock Levels Status</Typography>
          <div className="mt-3 flex flex-wrap gap-2">
            {statusChips.map((chip) => (
              <span
                key={chip.label}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${chip.className}`}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </section>

        <section>
          <Typography variant="overline">Low Stock Alerts</Typography>
          <div className="mt-3 overflow-x-auto rounded-lg border border-[color:var(--card-border)]">
            <table className="w-full min-w-72 text-left text-xs">
              <thead className="bg-[color:var(--sidebar-hover)]">
                <tr>
                  <th className="px-3 py-2 font-semibold">Product Name</th>
                  <th className="px-3 py-2 font-semibold">Current Qty</th>
                  <th className="px-3 py-2 font-semibold">Reorder Point</th>
                  <th className="px-3 py-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lowStockAlerts.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-[color:var(--card-border)]"
                  >
                    <td className="px-3 py-2 font-medium">{item.name}</td>
                    <td className="px-3 py-2">{item.currentQty}</td>
                    <td className="px-3 py-2 text-[color:var(--accent-negative)]">
                      {item.reorderPoint}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1">
                        <Tooltip title="Edit threshold" arrow>
                          <Button
                            aria-label={`Edit ${item.name}`}
                            sx={{
                              minWidth: 0,
                              height: 28,
                              width: 28,
                              color: 'var(--sidebar-muted)',
                            }}
                          >
                            <icons.edit size={14} />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete alert" arrow>
                          <Button
                            aria-label={`Delete ${item.name} alert`}
                            sx={{
                              minWidth: 0,
                              height: 28,
                              width: 28,
                              color: 'var(--accent-negative)',
                            }}
                          >
                            <icons.delete size={14} />
                          </Button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="min-h-44 flex-1">
          <Typography variant="overline">Inventory Turnover Ratio</Typography>
          <div className="mt-1 grid grid-cols-1 gap-2 md:grid-cols-[110px_1fr] lg:grid-cols-1 xl:grid-cols-[110px_1fr]">
            <div>
              <Typography variant="h2">Metric</Typography>
              <Typography
                variant="body-sm"
                className="text-[color:var(--sidebar-muted)]"
              >
                Metric
              </Typography>
            </div>
            <div className="h-32 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={inventoryTurnover}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" hide />
                  <YAxis hide domain={[50, 90]} />
                  <ChartTooltip />
                  <ReferenceLine
                    x="Oct 17"
                    stroke="#2f7ed8"
                    label={{ value: '82.8%', position: 'top', fontSize: 11 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2f7ed8"
                    fill="#2f7ed820"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </CardContainer>
  );
};
