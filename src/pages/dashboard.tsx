import TotalRevenueCard from '../components/cards/TotalRevenueCard';
import PageContainer from '../components/common/PageContainer';

const Dashboard = () => {
  return (
    <PageContainer> 
      <div className='flex flex-row gap-2'>
      {[1,2,3].map(() => (
        <TotalRevenueCard 
          title={"Total Revenue"}  
          totalRevenueToday={2400}
          totalRevenueYesterday={5000}
        />
      ))}
    </div>
    </PageContainer>
  
  )
}

export default Dashboard;