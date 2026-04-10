import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { icons } from '../../lib/constants/icons';
import { cn } from '../../lib/helpers/cn';
import CardContainer from '../common/CardContainer';
import { Typography } from '../common/Typography';

const CreateSalesForm = () => {
  const [activeTab, setActiveTab] = useState<number | null>(1);

  const handleActiveTab = (tab: number) => {
    setActiveTab(tab);
  };
  return (
    <CardContainer
      className="w-full min-w-400"
      title="Create New Sales Transaction"
    >
      <header className="flex flex-row gap">
        <section
          // onClick={() => handleActiveTab(0)}
          className={cn(
            // activeTab === 0 ? 'bg-blue-500' : 'bg-(--main-bg)',
            'hover:cursor-not-allowed gap-2 flex-1 border flex justify-between items-center p-4 mr-1 rounded-sm',
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <icons.dashboard size={16} color="gray" />
            <Typography variant="h4" className="text-gray-400">
              Bulk CSV Upload
            </Typography>
          </div>

          <Button disabled className="flex flex-row items-center gap-2">
            <icons.visbilityOn />
            <Typography>Download Template</Typography>
          </Button>
        </section>
        <section
          onClick={() => handleActiveTab(1)}
          className={cn(
            activeTab === 1 ? 'bg-blue-500' : 'bg-(--main-bg)',
            'hover:cursor-pointer flex gap-2 flex-1 border flex-row justify-center items-center ml-1 rounded-sm',
          )}
        >
          <icons.edit />
          <Typography variant="h4">Manual Sales Entry</Typography>
        </section>
      </header>
      <form className="flex flex-col h-150 border gap-2">
        <section className="border flex-1 w-full">
          <Typography>Transaction Details</Typography>
          <div className="flex flex-row gap-2">
            <TextField type="date" />
            <TextField type="hidden" />
          </div>
        </section>
        <section className="border flex-1 w-full"> </section>
        <section className="border flex-1 w-full"> </section>
        <section className="border flex-1 w-full"> </section>
      </form>
    </CardContainer>
  );
};

export default CreateSalesForm;
