import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip } from '@mui/material';
import { cn } from '../../lib/helpers/cn';
import MoneyLoader from './LoadingComponent';
import { Typography } from './Typography';

export interface CardContainerProps {
  title?: string;
  info?: string;
  toolBar?: React.ReactNode;
  children: React.ReactNode;

  loading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  className?: string;
}

const CardContainer = ({
  title,
  info,
  toolBar,
  children,
  loading = false,
  isEmpty = false,
  emptyMessage = 'No data available',
  className,
}: CardContainerProps) => {
  const resolvedtoolBar = toolBar ?? <InfoOutlinedIcon fontSize="small" />;
  const tooltipMessage = info ?? '';
  const showToolbar = Boolean(toolBar || info);

  return (
    <div
      className={cn(
        'w-full h-full min-w-0 rounded-2xl p-6 shadow-xl transition-colors duration-300 flex flex-col',
        className,
      )}
      style={{ backgroundColor: 'var(--card)', color: 'var(--main-text)' }}
    >
      {/* Header */}
      {!loading && (
        <div className="flex justify-between items-start mb-6">
          <div>
            <Typography variant="h3" className="text-lg font-semibold">
              {title}
            </Typography>
          </div>
          {showToolbar && (
            <Tooltip title={tooltipMessage} arrow disableHoverListener={!info}>
              <span className="inline-flex items-center cursor-help opacity-70">
                {resolvedtoolBar}
              </span>
            </Tooltip>
          )}
        </div>
      )}

      {/* Body */}
      <div className="w-full h-full min-h-0 flex-1 flex flex-col">
        {/* Loading State (ONE skeleton only) */}
        {loading && <MoneyLoader />}

        {/* Loading | isEmpty */}
        {!loading && isEmpty && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-4 opacity-40">📦</div>
            <p className="text-sm opacity-60">{emptyMessage}</p>
          </div>
        )}

        {/* Content */}
        {!loading && !isEmpty && (
          <div className="h-full min-h-0 flex-1">{children}</div>
        )}
      </div>
    </div>
  );
};

export default CardContainer;
