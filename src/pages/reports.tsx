import PageContainer from '../components/common/PageContainer';

const Reports = () => {
  return (
    <PageContainer className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">Reports</h1>
      <p className="text-sm text-[color:var(--sidebar-muted)]">
        Reporting dashboards will live here.
      </p>
    </PageContainer>
  );
};

export default Reports;
