import AdminNavBar from '@/components/custom/NavBar/AdminNavBar';

const AdminLayout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  return (
    <>
      <AdminNavBar />
      {children}
    </>
  );
};

export default AdminLayout;
