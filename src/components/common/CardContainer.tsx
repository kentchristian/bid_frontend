import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Skeleton, Tooltip } from '@mui/material';
import { cn } from '../../lib/helpers/cn';
import { Typography } from './Typography';

export interface CardContainerProps {
  title?: string;
  info?: string;
  toolbarIcon?: React.ReactNode;
  children: React.ReactNode;

  loading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  className?: string;
}

const CardContainer = ({
  title,
  info,
  toolbarIcon,
  children,
  loading = false,
  isEmpty = false,
  emptyMessage = 'No data available',
  className,
}: CardContainerProps) => {
  const resolvedToolbarIcon = toolbarIcon ?? (
    <InfoOutlinedIcon fontSize="small" />
  );
  const tooltipMessage = info ?? '';
  const showToolbar = Boolean(toolbarIcon || info);

  return (
    <div
      className={cn(
        'w-full h-full min-w-0 rounded-2xl p-6 shadow-xl transition-colors duration-300',
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
                {resolvedToolbarIcon}
              </span>
            </Tooltip>
          )}
        </div>
      )}

      {/* Body */}
      <div className="w-full h-full">
        {/* Loading State (ONE skeleton only) */}
        {loading && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height="100%"
            sx={{ borderRadius: '16px' }}
          />
        )}

        {/* Loading | isEmpty */}
        {!loading && isEmpty && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-4 opacity-40">📦</div>
            <p className="text-sm opacity-60">{emptyMessage}</p>
          </div>
        )}

        {/* Content */}
        {!loading && !isEmpty && <div className="h-full">{children}</div>}
      </div>
    </div>
  );
};

export default CardContainer;
