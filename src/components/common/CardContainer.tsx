import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Skeleton, Tooltip } from '@mui/material';
import { cn } from '../../lib/helpers/cn';
import EmptyState from './EmptyState';
import { Typography } from './Typography';

export interface CardContainerProps {
  title?: string;
  info?: string;
  toolBar?: React.ReactNode;
  children: React.ReactNode;
  customFunction?: React.ReactNode;

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
  customFunction,
}: CardContainerProps) => {
  const resolvedtoolBar = toolBar ?? <InfoOutlinedIcon fontSize="small" />;
  const tooltipMessage = info ?? '';
  const showToolbar = Boolean(toolBar || info);

  return (
    <div
      className={cn(
        'card-container w-full h-full min-h-25 min-w-0 rounded-2xl p-6 shadow-xl transition-colors duration-300 flex flex-col',
        className,
      )}
      style={{ backgroundColor: 'var(--card)', color: 'var(--main-text)' }}
    >
      {/* Header */}
      {!loading && (
        <div className="card-header flex justify-between items-center mb-6">
          <div className="flex flex-row items-center gap-2">
            <Typography variant="h3" className="text-lg font-semibold">
              {title}
            </Typography>
            {showToolbar && (
              <Tooltip
                title={tooltipMessage}
                arrow
                disableHoverListener={!info}
              >
                <span className="inline-flex items-center cursor-help opacity-70">
                  {resolvedtoolBar}
                </span>
              </Tooltip>
            )}
          </div>

          {customFunction}
        </div>
      )}

      {/* Body */}
      <div className="w-full h-full min-h-0 flex-1 flex flex-col">
        {/* Loading State (ONE skeleton only) */}
        {loading && (
          <Skeleton
            variant="rectangular"
            className={cn('w-full h-full flex-1 rounded-xl')}
          />
        )}

        {/* Loading | isEmpty */}
        {!loading && isEmpty && <EmptyState />}

        {/* Content */}
        {!loading && !isEmpty && (
          <div className="h-full min-h-0 flex-1">{children}</div>
        )}
      </div>
    </div>
  );
};

export default CardContainer;
