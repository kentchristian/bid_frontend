import { format } from 'date-fns';
import { useRef } from 'react';
import PageContainer from '../components/common/PageContainer';
import DateRangePicker, {
  type DateRangeRef,
} from '../components/filters/DateRangePicker';
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
      <DateRangePicker ref={dateRangeRef} />
    </PageContainer>
  );
};

export default Sales;
