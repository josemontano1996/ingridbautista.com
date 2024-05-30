import { redirect } from 'next/navigation';

const AdminIndexPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  redirect(`/${locale}/admin/menu`);
};

export default AdminIndexPage;
