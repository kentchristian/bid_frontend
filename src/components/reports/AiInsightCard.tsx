import { Tooltip } from '@mui/material';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
} from 'recharts';
import { icons } from '../../lib/constants/icons';
import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';
import { aiTrend } from './reportData';

export const AiInsightCard = () => {
  return (
    <CardContainer className="min-h-44 border border-blue-300/80 bg-blue-50/50 p-4 shadow-sm">
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Typography variant="body" weight={700}>
              What was the top-selling product last week?
            </Typography>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Tooltip title="AI generated insight" arrow>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-700">
                <icons.bot size={18} />
              </span>
            </Tooltip>
            <Tooltip title="More report actions" arrow>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[color:var(--sidebar-muted)] hover:bg-[color:var(--sidebar-hover)]"
                aria-label="More insight actions"
              >
                <icons.more size={18} />
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 items-center gap-4 md:grid-cols-[1fr_120px_180px]">
          <div className="rounded-lg border border-[color:var(--card-border)] bg-[color:var(--card)] p-3">
            <Typography
              variant="overline"
              className="text-[10px] text-blue-700"
            >
              Product Sales Leader
            </Typography>
            <Typography variant="body-sm" className="mt-2 leading-5">
              Product Sales Later “Organic Coffee Beans” (452 units, $6,780
              revenue). Sales increased by 12% vs. previous week.
            </Typography>
          </div>

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-lg bg-stone-100 shadow-inner">
            <div className="h-16 w-11 rounded-sm bg-stone-700 p-1 shadow-md">
              <div className="h-full rounded-sm bg-stone-100">
                <div className="mx-auto mt-2 h-5 w-5 rounded-full bg-stone-700" />
                <div className="mx-auto mt-3 h-1 w-7 rounded bg-stone-400" />
                <div className="mx-auto mt-1 h-1 w-6 rounded bg-stone-300" />
              </div>
            </div>
          </div>

          <div className="h-24 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={aiTrend}>
                <ChartTooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2f7ed8"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};
