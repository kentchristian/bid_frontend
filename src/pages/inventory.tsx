import { Button } from '@mui/material';
import InventoryByCategory from '../components/charts/InventoryByCategory';
import PageContainer from '../components/common/PageContainer';

import InventoryKPICount from '../components/common/InventoryKPICount';
import { Typography } from '../components/common/Typography';
import HeaderContent from '../components/nav/HeaderContent';
import WareHouseInventory from '../components/tables/WareHoustInventory';
import { icons } from '../lib/constants/icons';
import { currency } from '../lib/utils/currency';

const Inventory = () => {
  const handleAddInventory = () => {};

  const inventoryKPIData = [
    {
      title: 'Total Iventory Revenue',
      details: `The total market value of the stock if sold at current unit prices. 
            Excluding tax and discounts.`,
      data: currency.format(30),
      caption: 'Quantity * Unit Price',
    },
    {
      title: 'Total Inventory Items',
      details: `The total number of physical units currently recorded in
               inventory across all categories.`,
      data: '',
      caption: '',
    },
  ];

  return (
    <PageContainer className="flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <HeaderContent
          title="Inventory"
          description="A centralized hub for stock intelligence. 
          Use advanced filtering to analyze turnover, reconcile quantities, and synchronize 
          inventory across all store locations."
        />
        <Button
          endIcon={<icons.circlePlus size={30} />}
          sx={{
            color: 'var(--invert-text)',
            backgroundColor: 'var(--accent-positive)',
            '&:hover': {
              backgroundColor: 'var(--accent-positive-hover)',
              color: 'var(--invert-text)',
            },
          }}
          onClick={handleAddInventory}
        >
          <Typography variant="body">Add Inventory</Typography>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex gap-2 flex-col">
          {inventoryKPIData?.map((item) => (
            <InventoryKPICount title={item?.title} info={item?.details} />
          ))}
        </div>

        <InventoryByCategory />
      </div>
      <WareHouseInventory />
    </PageContainer>
  );
};

export default Inventory;
