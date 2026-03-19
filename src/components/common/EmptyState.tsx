import { Typography } from './Typography';

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

const EmptyState = ({
  title = 'No data found',
  description = 'There is currently no information to display here.',
  className = '',
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 ${className}`}
    >
      {/* Custom SVG Data Coded */}
      <svg
        className="w-24 h-24 mb-4 "
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
        <circle
          cx="12"
          cy="12"
          r="10"
          strokeOpacity="0.1"
          fill="currentColor"
          fillOpacity="0.05"
        />
      </svg>

      <Typography variant="h2" className="var(--main-text)">
        {title}
      </Typography>
      <Typography
        variant="caption"
        className="max-w-xs mt-1 text-slate-500 dark:text-slate-400"
      >
        {description}
      </Typography>
    </div>
  );
};

export default EmptyState;
