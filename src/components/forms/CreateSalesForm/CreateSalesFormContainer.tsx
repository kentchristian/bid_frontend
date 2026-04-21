import { Button } from '@mui/material';
import { useState } from 'react';
import { icons } from '../../../lib/constants/icons';
import { cn } from '../../../lib/helpers/cn';
import CardContainer from '../../common/CardContainer';
import { Typography } from '../../common/Typography';
import CreateSalesForm from './CreateSalesForm';

interface CreateSalesFormContainerProps {
  handleCreateSalesClose: () => void;
}
const CreateSalesFormContainer = ({
  handleCreateSalesClose,
}: CreateSalesFormContainerProps) => {
  const [activeTab, setActiveTab] = useState<number | null>(1);

  const handleActiveTab = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <CardContainer className="w-full min-w-300">
      <header className="flex flex-row gap">
        <section
          // onClick={() => handleActiveTab(0)}
          className={cn(
            // activeTab === 0 ? 'bg-blue-500' : 'bg-(--main-bg)',
            'hover:cursor-not-allowed gap-2 flex-1 flex justify-between items-center p-4 mr-1 rounded-sm',
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <icons.upload size={25} color="gray" />
            <Typography variant="h4" className="text-gray-400">
              Bulk CSV Upload
            </Typography>
          </div>

          <Button
            component="a"
            disabled
            className="flex flex-row items-center gap-2"
          >
            <Typography variant="overline">Download Template</Typography>
          </Button>
        </section>
        <section
          onClick={() => handleActiveTab(1)}
          className={cn(
            activeTab === 1 ? 'bg-(--accent-positive)' : 'bg-(--main-bg)',
            'text-(--invert-text)',
            'hover:cursor-pointer flex gap-2 flex-1 flex-row justify-center items-center ml-1 rounded-sm',
          )}
        >
          <icons.edit />
          <Typography variant="h4">Manual Sales Entry</Typography>
        </section>
      </header>
      <CreateSalesForm />
    </CardContainer>
  );
};

export default CreateSalesFormContainer;
