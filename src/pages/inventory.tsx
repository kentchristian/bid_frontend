import ComingSoon from '../components/common/ComingSoon';
import PageContainer from '../components/common/PageContainer';

const Inventory = () => {
  return (
    <PageContainer className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">Inventory</h1>
      <p className="text-sm text-[color:var(--sidebar-muted)]">
        Inventory management content will live here.
      </p>
      <ComingSoon />
    </PageContainer>
  );
};

export default Inventory;
