import type { TransformedTodaysTopHits } from '../../lib/types/todays-top-hits-type';
import CardContainer from '../common/CardContainer';
import TruncatedText from '../common/TruncatedText';
import { Typography } from '../common/Typography';

interface TodaysTopHitsProps {
  data?: TransformedTodaysTopHits[] | null;
  loading?: boolean;
}

const TodaysTopHits = ({ data, loading }: TodaysTopHitsProps) => {
  const isEmpty = !data || data.length === 0;

  const rankPalette = [
    {
      border: 'border-[#FFD700]',
      badge: 'border-[#FFD700] text-[#FFD700]',
      bar: 'bg-[#FFD700]',
    },
    {
      border: 'border-[#C0C0C0]',
      badge: 'border-[#C0C0C0] text-[#C0C0C0]',
      bar: 'bg-[#C0C0C0]',
    },
    {
      border: 'border-[#CD7F32]',
      badge: 'border-[#CD7F32] text-[#CD7F32]',
      bar: 'bg-[#CD7F32]',
    },
  ];

  return (
    <CardContainer
      title="Today’s Top Hits"
      info="Ranks the top-performing products for the current day based on total accumulated sales.
Displays revenue generated, quantity sold, remaining inventory, unit price, product classification, and latest update timestamp."
      className="top-hits-container flex-1 min-w-0 min-h-100"
      loading={loading}
      isEmpty={isEmpty}
    >
      {data && (
        <ul className="space-y-3">
          {data.map((product) => {
            const rankStyle =
              rankPalette[product.rank - 1] ??
              rankPalette[rankPalette.length - 1];
            const quantityPct = Math.round(
              (product.quantity / product.max_quantity) * 100,
            );
            const remainingPct = 100 - quantityPct;
            const progressTone =
              remainingPct < 25
                ? 'bg-(--accent-negative)'
                : remainingPct < 50
                  ? 'bg-orange-500'
                  : remainingPct < 75
                    ? 'bg-yellow-400'
                    : 'bg-(--accent-positive)';

            return (
              <li
                key={product.id}
                className={`top-hits-item group rounded-2xl border-2 p-4 shadow-sm transition-all duration-300 hover:shadow-md bg-[color:var(--sidebar-bg)] ${rankStyle.border}`}
              >
                <div className="top-hits-row flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center h-15 w-15">
                      {product.rankSymbol}
                    </div>

                    <div>
                      <Typography
                        variant="body-sm"
                        weight={600}
                        className="text-[color:var(--main-text)]"
                      >
                        <TruncatedText text={product.name} maxLength={23} />
                      </Typography>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <Typography
                          asChild
                          variant="caption"
                          className="rounded-full bg-[color:var(--card)] px-2 py-0.5 text-[color:var(--sidebar-muted)]"
                        >
                          <span>Class: {product.class}</span>
                        </Typography>
                        <Typography
                          asChild
                          variant="caption"
                          className="rounded-full bg-[color:var(--card)] px-2 py-0.5 text-[color:var(--sidebar-muted)]"
                        >
                          <span>Qty: {product.quantity}</span>
                        </Typography>
                      </div>
                      <Typography
                        variant="caption"
                        className="mt-2 text-[color:var(--sidebar-muted)]"
                      >
                        Updated Today • {product.updatedAt}
                      </Typography>
                    </div>
                  </div>

                  <div className="top-hits-meta text-right">
                    <Typography
                      variant="body-lg"
                      weight={600}
                      align="right"
                      className="text-[color:var(--accent-positive)]"
                    >
                      ₱ {product.totalRevenue.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="caption"
                      align="right"
                      className="text-[color:var(--sidebar-muted)]"
                    >
                      ₱ {product.price.toLocaleString()} / unit
                    </Typography>

                    <div className="top-hits-progress mt-2 flex items-center justify-end gap-2">
                      <div className="top-hits-bar h-1.5 w-24 rounded-full bg-[color:var(--card-border)]">
                        <div
                          className={`h-1.5 rounded-full ${progressTone}`}
                          style={{ width: `${quantityPct}%` }}
                        />
                      </div>
                      <Typography
                        variant="caption"
                        weight={600}
                        className="text-[color:var(--sidebar-muted)]"
                      >
                        {quantityPct}%
                      </Typography>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </CardContainer>
  );
};

export default TodaysTopHits;
