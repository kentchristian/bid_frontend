import { cn } from '../../lib/helpers/cn';
import type { ContainerType } from '../../lib/types/container-types';

const SCROLLBAR_CONFIG = 'overflow-y-auto overflow-x-hidden themed-scrollbar';

const PageContainer = ({
  children,
  loading,
  empty,
  className,
}: ContainerType) => {
  return (
    // add that customizable className
    <div
      className={cn(
        'page-container w-full h-full p-4',
        SCROLLBAR_CONFIG,
        className,
      )}
    >
      {
        //TODO: create a custom loading component
        loading && loading.isLoading && <div>Loading... </div>
      }

      {
        // TODO: create a custom empty component
        empty && empty.isEmpty && <div>Empty... </div>
      }
      {children}
    </div>
  );
};

export default PageContainer;
