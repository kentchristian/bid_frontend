import { Skeleton } from '@mui/material';

export interface CardContainerProps {
  title: string;
  info?: string;
  toolbarIcon?: React.ReactNode;
  children: React.ReactNode;

  loading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
}

const CardContainer = ({
  title,
  info,
  toolbarIcon,
  children,
  loading = false,
  isEmpty = false,
  emptyMessage = 'No data available',
}: CardContainerProps) => {
  return (
    <div
      className="w-full h-full rounded-2xl p-6 shadow-xl transition-colors duration-300"
      style={{ backgroundColor: 'var(--card)', color: 'var(--main-text)' }}
    >
      {/* Header */}
      {!loading && (
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm opacity-60 mt-1">{info}</p>
          </div>
          <div>{toolbarIcon}</div>
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
