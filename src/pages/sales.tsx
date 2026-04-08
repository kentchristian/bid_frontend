import { Button } from '@mui/material';
import { useRef, useState } from 'react';

import { RevenueByCategory } from '../components/cards/RevenueByCategory';
import DynamicModal from '../components/common/DynamicModal';
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

  const getSelectedDates = () => {
    if (dateRangeRef.current) {
      return dateRangeRef.current.getRange();
    }
    return { from: null, to: null };
  };

  const [isCreateSalesOpen, setCreateSalesOpen] = useState(false);

  const handleCreateSales = () => {
    setCreateSalesOpen(true);
  };

  const handleCreateSalesClose = () => {
    setCreateSalesOpen(false);
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
          onClick={handleCreateSales}
        >
          <Typography variant="body">Create Sales</Typography>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <DateRangePicker ref={dateRangeRef} />
        <RevenueByCategory />
      </div>
      <SalesHistory getSelectedDates={getSelectedDates} />
      <DynamicModal
        open={isCreateSalesOpen}
        onClose={handleCreateSalesClose}
        maxWidth={500}
        children={<div>Somethasfasdfasdf asdf asdf asing</div>}
      />
    </PageContainer>
  );
};

export default Sales;
