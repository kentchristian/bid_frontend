import { Button } from '@mui/material';
import { format } from 'date-fns';
import { useRef } from 'react';

import { RevenueByCategory } from '../components/cards/RevenueByCategory';
import PageContainer from '../components/common/PageContainer';
import { Typography } from '../components/common/Typography';
import DateRangePicker, {
  type DateRangeRef,
} from '../components/filters/DateRangePicker';
import HeaderContent from '../components/nav/HeaderContent';
import SalesHistory from '../components/tables/SalesHistory';
import { icons } from '../lib/constants/icons';

const Sales = () => {
  // reference to the picker
  const dateRangeRef = useRef<DateRangeRef>(null);

  const handleApplyFilter = () => {
    if (dateRangeRef.current) {
      const { from, to } = dateRangeRef.current.getRange();
      if (!from) {
        alert('Please select a start date.');
        return;
      }
      alert(
        `Filtering data: ${format(from, 'MMM dd, yyyy')} - ${format(
          to ?? from,
          'MMM dd, yyyy',
        )}`,
      );
    }
  };

  // const {
  //   data: sales,
  //   isLoading: salesLoading,
  //   status: salesStatus,
  // } = useSalesMetrics();

  return (
    <PageContainer className="flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <HeaderContent
          title="Sales"
          description="A centralized command point for your sales ecosystem. 
          Use advanced date filtering to audit performance, manage line items, 
          and synchronize multi-tenant records."
        />
        <Button
          startIcon={<icons.receipt />}
          sx={{
            color: 'var(--invert-text)',
            backgroundColor: 'var(--accent-positive)',
            '&:hover': {
              backgroundColor: 'var(--accent-positive-hover)',
              color: 'var(--invert-text)',
            },
          }}
        >
          <Typography variant="body">Create Sales</Typography>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <DateRangePicker ref={dateRangeRef} />
        <RevenueByCategory />
      </div>

      <SalesHistory />
    </PageContainer>
  );
};

export default Sales;
