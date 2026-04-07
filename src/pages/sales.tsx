import { Button } from '@mui/material';
import { format } from 'date-fns';
import { useRef } from 'react';
import PageContainer from '../components/common/PageContainer';
import { Typography } from '../components/common/Typography';
import DateRangePicker, {
  type DateRangeRef,
} from '../components/filters/DateRangePicker';
import HeaderContent from '../components/nav/HeaderContent';
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
      <DateRangePicker ref={dateRangeRef} />
    </PageContainer>
  );
};

export default Sales;
