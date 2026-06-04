import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { type Dayjs } from 'dayjs';

type ReportMonthYearPickerProps = {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
};

type MonthYearPickerValue = Dayjs | Date | null;

export const ReportMonthYearPicker = ({
  label,
  value,
  onChange,
}: ReportMonthYearPickerProps) => {
  const handleChange = (newValue: MonthYearPickerValue) => {
    if (!newValue) {
      onChange(null);
      return;
    }

    onChange(dayjs.isDayjs(newValue) ? newValue : dayjs(newValue));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        enableAccessibleFieldDOMStructure={false}
        views={['year', 'month']}
        openTo="month"
        format="MMMM YYYY"
        value={value}
        onChange={handleChange}
        slots={{
          textField: TextField,
        }}
        slotProps={{
          textField: {
            size: 'small',
            'aria-label': label,
            sx: {
              width: 156,
              '& .MuiInputBase-root': {
                height: 32,
                color: 'var(--main-text)',
                fontSize: 12,
                borderRadius: '8px',
                backgroundColor: 'var(--card)',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--card-border)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--sidebar-muted)',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--accent-positive)',
              },
              '& .MuiSvgIcon-root': {
                color: 'var(--sidebar-muted)',
                fontSize: 18,
              },
            },
          },
          popper: {
            sx: {
              '& .MuiPaper-root': {
                color: 'var(--main-text)',
                border: '1px solid var(--card-border)',
                backgroundColor: 'var(--card)',
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
