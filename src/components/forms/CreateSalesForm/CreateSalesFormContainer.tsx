import { Button } from '@mui/material';
import { type FormEvent, useState } from 'react';
import { icons } from '../../../lib/constants/icons';
import { cn } from '../../../lib/helpers/cn';
import CardContainer from '../../common/CardContainer';
import { Typography } from '../../common/Typography';
import CreateSalesForm, { type CreateSalesLineItem } from './CreateSalesForm';

const CreateSalesFormContainer = () => {
  const [activeTab, setActiveTab] = useState<number | null>(1);
  const [quantity, setQuantity] = useState(1);

  const lineItems: CreateSalesLineItem[] = [
    {
      id: 1,
      product: 'X200 Wireless Mouse',
      category: 'Electronics',
      unitPrice: 25,
      qty: 3,
    },
    {
      id: 2,
      product: 'Ergonomic Office Chair',
      category: 'Office Furniture',
      unitPrice: 150,
      qty: 1,
    },
  ];

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.unitPrice * item.qty,
    0,
  );
  const taxRate = 0.08;
  const tax = Number((subtotal * taxRate).toFixed(2));
  const total = subtotal + tax;
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const handleIncrementQuantity = () =>
    setQuantity((prev) => Math.min(prev + 1, 999));
  const handleDecrementQuantity = () =>
    setQuantity((prev) => Math.max(prev - 1, 1));

  const handleActiveTab = (tab: number) => {
    setActiveTab(tab);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      <CreateSalesForm
        lineItems={lineItems}
        quantity={quantity}
        onSubmit={handleSubmit}
        subtotal={subtotal}
        tax={tax}
        taxRate={taxRate}
        total={total}
        currency={currency}
      />
    </CardContainer>
  );
};

export default CreateSalesFormContainer;
