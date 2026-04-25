import { Button } from '@mui/material';
import OverallInventoryCount from '../components/cards/OverallInventoryQuantity';
import TotalInventoryRevenue from '../components/cards/TotalInventoryRevenue';
import InventoryByCategory from '../components/charts/InventoryByCategory';
import PageContainer from '../components/common/PageContainer';
import { Typography } from '../components/common/Typography';
import HeaderContent from '../components/nav/HeaderContent';
import WareHouseInventory from '../components/tables/WareHoustInventory';
import { icons } from '../lib/constants/icons';

const Inventory = () => {
  const handleAddInventory = () => {};

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
          <TotalInventoryRevenue
            title="Total Iventory Revenue"
            info={`The total market value of your the stock if sold at current unit prices. 
            Excluding tax and discounts.`}
          />
          <OverallInventoryCount
            title="Total Iventory Revenue"
            info={`The total market value of your the stock if sold at current unit prices. 
            Excluding tax and discounts.`}
          />
        </div>

        <InventoryByCategory />
      </div>
      <WareHouseInventory />
    </PageContainer>
  );
};

export default Inventory;
