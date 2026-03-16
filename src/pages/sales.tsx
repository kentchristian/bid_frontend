import PageContainer from '../components/common/PageContainer';

const Sales = () => {
  return (
    <PageContainer className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">Sales</h1>
      <p className="text-sm text-[color:var(--sidebar-muted)]">
        Sales overview content will live here.
      </p>
    </PageContainer>
  );
};

export default Sales;
