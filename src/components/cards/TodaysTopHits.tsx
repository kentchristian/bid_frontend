import { Typography } from '../common/Typography';

type Product = {
  id: number;
  rank: number;
  name: string;
  class: string;
  quantity: number;
  totalRevenue: number;
  price: number;
  updatedAt: string;
};

const topProducts: Product[] = [
  {
    id: 1,
    rank: 1,
    name: 'Laptop Pro 15',
    class: 'Electronics',
    quantity: 120,
    totalRevenue: 5400000,
    price: 45000,
    updatedAt: 'Today • 3:45 PM',
  },
  {
    id: 2,
    rank: 2,
    name: 'Wireless Mouse',
    class: 'Accessories',
    quantity: 340,
    totalRevenue: 408000,
    price: 1200,
    updatedAt: 'Today • 3:30 PM',
  },
  {
    id: 3,
    rank: 3,
    name: 'Mechanical Keyboard',
    class: 'Accessories',
    quantity: 210,
    totalRevenue: 735000,
    price: 3500,
    updatedAt: 'Today • 2:50 PM',
  },
];

const TodaysTopHits = () => {
  const maxQuantity = Math.max(
    ...topProducts.map((product) => product.quantity),
  );
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
    <ul className="space-y-3">
      {topProducts.map((product) => {
        const rankStyle =
          rankPalette[product.rank - 1] ?? rankPalette[rankPalette.length - 1];
        const quantityPct = Math.round((product.quantity / maxQuantity) * 100);
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
            className={`group rounded-2xl border-2 p-4 shadow-sm transition-all duration-300 hover:shadow-md bg-[color:var(--sidebar-bg)] ${rankStyle.border}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold ${rankStyle.badge}`}
                  >
                    <Typography asChild variant="body-sm" weight={700}>
                      <span className="text-inherit">{product.rank}</span>
                    </Typography>
                  </div>
                  <Typography
                    variant="overline"
                    className="mt-1 text-[color:var(--sidebar-muted)]"
                  >
                    Rank
                  </Typography>
                </div>

                <div>
                  <Typography
                    variant="body-sm"
                    weight={600}
                    className="text-[color:var(--main-text)]"
                  >
                    {product.name}
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
                    Updated {product.updatedAt}
                  </Typography>
                </div>
              </div>

              <div className="text-right">
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

                <div className="mt-2 flex items-center justify-end gap-2">
                  <div className="h-1.5 w-24 rounded-full bg-[color:var(--card-border)]">
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
  );
};

export default TodaysTopHits;
