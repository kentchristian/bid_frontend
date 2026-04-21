import { Button } from '@mui/material';
import ComingSoon from '../components/common/ComingSoon';
import PageContainer from '../components/common/PageContainer';
import TransactionTicketModal from '../components/modals/TransactionTicketModal';
import { useTransactionTicket } from '../lib/store/useTransactionTicket';

const Reports = () => {
  const { onOpen } = useTransactionTicket(); // Transaction Ticket State

  return (
    <PageContainer className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">Reports</h1>
      <p className="text-sm text-[color:var(--sidebar-muted)]">
        Reporting dashboards will live here.
      </p>
      <ComingSoon />
      <Button onClick={onOpen}>Open</Button>
      <TransactionTicketModal />;
    </PageContainer>
  );
};

export default Reports;
