import { Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { endOfMonth, isBefore, startOfDay, startOfMonth } from 'date-fns';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Typography } from '../common/Typography';

export interface DateRangeRef {
  getRange: () => {
    from: Date;
    to: Date | null;
  };
}

const DateRangePicker = forwardRef<DateRangeRef>((_props, ref) => {
  // only care for ref prop
  const [fromDate, setFromDate] = useState<Date>(() => startOfDay(new Date()));
  const [toDate, setToDate] = useState<Date | null>(null);

  // Expose Variable
  useImperativeHandle(ref, () => ({
    getRange: () => ({
      from: fromDate,
      to: toDate,
    }),
  }));

  // defaul min date
  const minToDate = useMemo(() => startOfMonth(fromDate), [fromDate]);

  // defaul maxdate for from
  const maxFromDate = useMemo(() => endOfMonth(fromDate), [fromDate]);

  const handleFromChange = (newValue: Date | null) => {
    if (!newValue || Number.isNaN(newValue.getTime())) return;
    const normalized = startOfDay(newValue);
    setFromDate(normalized);

    if (toDate && isBefore(toDate, normalized)) {
      setToDate(null);
    }
  };

  const handleToChange = (newValue: Date | null) => {
    if (!newValue || Number.isNaN(newValue.getTime())) return;
    const normalized = startOfDay(newValue);
    if (isBefore(normalized, fromDate)) return;
    setToDate(normalized);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex flex-col gap-4 md:flex-row">
        {/* FROM CALENDAR */}
        <div>
          <Typography variant="body-lg">Start Date</Typography>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={fromDate}
            onChange={handleFromChange}
            onAccept={handleFromChange}
            maxDate={maxFromDate}
            // Disable any date in the past if needed,
            // or leave open depending on your requirements
            slotProps={{
              toolbar: { hidden: true },
              actionBar: { actions: [] },
            }}
          />
        </div>

        {/* TO CALENDAR */}
        <Box>
          <Typography variant="body-lg">End Date</Typography>
          <StaticDatePicker
            key={`to-picker-${fromDate.getTime()}`}
            displayStaticWrapperAs="desktop"
            value={toDate}
            onChange={handleToChange}
            onAccept={handleToChange}
            minDate={minToDate}
            referenceDate={minToDate}
            shouldDisableDate={(date) => isBefore(date, fromDate)}
            slotProps={{
              toolbar: { hidden: true },
              actionBar: { actions: [] },
            }}
          />
        </Box>
      </div>
      {/* <Divider />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Typography variant="body-sm" className="text-gray-500">
                Start: {format(fromDate, 'MMM dd, yyyy')}
              </Typography>
              <Typography variant="body-sm" className="text-gray-500">
                End: {toDate ? format(toDate, 'MMM dd, yyyy') : 'Select end date'}
              </Typography>
            </div> */}
    </LocalizationProvider>
  );
});

export default DateRangePicker;
