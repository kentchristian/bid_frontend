import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';
import { staffLeaderboard } from './reportData';

export const StaffLeaderboard = () => {
  return (
    <CardContainer
      title="Staff Performance Leaderboard"
      className="min-h-72 p-4 shadow-sm"
    >
      <div className="overflow-x-auto rounded-lg border border-[color:var(--card-border)]">
        <table className="w-full min-w-[560px] text-left text-xs">
          <thead className="bg-[color:var(--sidebar-hover)]">
            <tr>
              <th className="px-3 py-2 font-semibold">Created By</th>
              <th className="px-3 py-2 font-semibold">
                Total Sales Transactions
              </th>
              <th className="px-3 py-2 font-semibold">Total Sales Revenue</th>
              <th className="px-3 py-2 font-semibold">
                Average Transaction Value
              </th>
            </tr>
          </thead>
          <tbody>
            {staffLeaderboard.map((staff) => (
              <tr
                key={staff.id}
                className="border-t border-[color:var(--card-border)]"
              >
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--sidebar-hover)] text-[10px] font-bold">
                      {staff.avatar}
                    </span>
                    <Typography variant="body-sm" weight={600}>
                      {staff.name}
                    </Typography>
                  </div>
                </td>
                <td className="px-3 py-2">{staff.transactions}</td>
                <td className="px-3 py-2 font-semibold">{staff.revenue}</td>
                <td className="px-3 py-2">{staff.average}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex justify-end gap-2 text-xs text-[color:var(--sidebar-muted)]">
        <span>Previous</span>
        <span className="rounded border border-[color:var(--card-border)] px-2">
          1
        </span>
        <span>Next 1</span>
      </div>
    </CardContainer>
  );
};
