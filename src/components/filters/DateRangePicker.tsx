import { Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import {
  endOfMonth,
  format,
  isBefore,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Typography } from '../common/Typography';

export interface DateRangeRef {
  getRange: () => {
    from: Date | null;
    to: Date | null;
  };
  clearDate: () => {
    from: null;
    to: null;
  };
}

const DateRangePicker = forwardRef<DateRangeRef>((_props, ref) => {
  // only care for ref prop
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const today = useMemo(() => startOfDay(new Date()), []);

  // Expose Variable
  useImperativeHandle(ref, () => ({
    getRange: () => ({
      from: fromDate,
      to: fromDate ? (toDate ?? fromDate) : null,
    }),
    clearDate: () => {
      setFromDate(null);
      setToDate(null);
      // Return nulls explicitly since state updates are async
      return { from: null, to: null };
    },
  }));

  // defaul min date
  const minToDate = useMemo(
    () => startOfMonth(fromDate ?? today),
    [fromDate, today],
  );

  // defaul maxdate for from
  const maxFromDate = useMemo(
    () => endOfMonth(fromDate ?? today),
    [fromDate, today],
  );

  const handleFromChange = (newValue: Date | null) => {
    if (!newValue || Number.isNaN(newValue.getTime())) return;
    const normalized = startOfDay(newValue);
    setFromDate(normalized);

    if (!toDate || isBefore(toDate, normalized)) {
      setToDate(normalized);
    }
  };

  const handleToChange = (newValue: Date | null) => {
    if (!newValue || Number.isNaN(newValue.getTime())) return;
    if (!fromDate) return;
    const normalized = startOfDay(newValue);
    if (isBefore(normalized, fromDate)) return;
    setToDate(normalized);
  };

  const shadowRadius = {
    boxShadow: '4px 0 16px rgba(0, 0, 0, 0.05)',
    borderRadius: 1,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex flex-col gap-4 md:flex-row">
        {/* FROM CALENDAR */}
        <div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <Typography variant="body-lg">Start Date</Typography>
            <Typography variant="caption">
              {fromDate && format(fromDate, 'MMM dd, yyyy')}
            </Typography>
          </div>

          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={fromDate}
            onChange={(val) => handleFromChange(val as Date | null)}
            onAccept={(val) => handleFromChange(val as Date | null)}
            maxDate={maxFromDate}
            referenceDate={fromDate ?? today}
            // Disable any date in the past if needed,
            // or leave open depending on your requirements
            slotProps={{
              toolbar: { hidden: true },
              actionBar: { actions: [] },
            }}
            sx={shadowRadius}
          />
        </div>

        {/* TO CALENDAR */}
        <Box>
          <div className="flex flex-row gap-2 items-center justify-between">
            <Typography variant="body-lg">End Date</Typography>
            <Typography variant="caption">
              {toDate && format(toDate, 'MMM dd, yyyy')}
            </Typography>
          </div>
          <StaticDatePicker
            key={
              fromDate ? `to-picker-${fromDate.getTime()}` : 'to-picker-empty'
            }
            displayStaticWrapperAs="desktop"
            value={toDate}
            onChange={(val) => handleToChange(val as Date | null)}
            onAccept={(val) => handleToChange(val as Date | null)}
            minDate={minToDate}
            referenceDate={minToDate}
            shouldDisableDate={(date) =>
              fromDate ? isBefore(date as Date, fromDate) : false
            }
            disabled={!fromDate}
            slotProps={{
              toolbar: { hidden: true },
              actionBar: { actions: [] },
            }}
            sx={shadowRadius}
          />
        </Box>
      </div>
    </LocalizationProvider>
  );
});

export default DateRangePicker;
