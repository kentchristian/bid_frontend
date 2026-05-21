import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';
import { recentTransactions } from './reportData';

export const RecentTransactionsReport = () => {
  return (
    <CardContainer
      title="Recent Transactions"
      className="min-h-72 p-4 shadow-sm"
    >
      <div className="overflow-x-auto rounded-lg border border-[color:var(--card-border)]">
        <table className="w-full min-w-[520px] text-left text-xs">
          <thead className="bg-[color:var(--sidebar-hover)]">
            <tr>
              <th className="px-3 py-2 font-semibold">Transaction ID</th>
              <th className="px-3 py-2 font-semibold">Date/Time</th>
              <th className="px-3 py-2 font-semibold">Created By</th>
              <th className="px-3 py-2 font-semibold">Items</th>
              <th className="px-3 py-2 font-semibold">Total Price</th>
              <th className="px-3 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-t border-[color:var(--card-border)]"
              >
                <td className="px-3 py-2 font-semibold text-blue-600">
                  {transaction.id}
                </td>
                <td className="px-3 py-2">{transaction.dateTime}</td>
                <td className="px-3 py-2">{transaction.createdBy}</td>
                <td className="px-3 py-2">{transaction.items}</td>
                <td className="px-3 py-2 font-semibold">{transaction.total}</td>
                <td className="px-3 py-2">
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-[color:var(--accent-positive)]">
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Typography
        variant="caption"
        className="mt-3 text-right text-[color:var(--sidebar-muted)]"
      >
        Synced from the latest completed transactions.
      </Typography>
    </CardContainer>
  );
};
