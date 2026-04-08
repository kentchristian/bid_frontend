
interface DateRangeState {
  from: Date,
  to: Date,

  setFrom: (from: Date) => void;
  setTo: (to: Date) => void;
  clearDate: () => void;
}

