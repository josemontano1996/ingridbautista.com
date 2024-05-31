import { redirect } from 'next/navigation';

import { AdminAccountData } from '@/app/[locale]/admin/config/AdminAccountData';

import { AdminSocialMediaForm } from './AdminSocialMediaForm';
import { ISocialData } from '@/shared/interfaces/ISocialData';
import SocialMedia from '@/infrastructure/persistence/models/SocialMedia';
import { connectDB } from '@/infrastructure/persistence/database-config';
import { serializeData } from '@/application/utils/serializeData';

export const revalidate = 0;

const ConfigPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  let socialData: ISocialData = {};

  try {
    await connectDB();

    socialData = (await SocialMedia.findOne().lean()) || {};

    if (!socialData) {
      throw new Error();
    }

    socialData = serializeData(socialData);
  } catch (error) {
    console.error(error);
    const errorMessage = encodeURI('Ha ocurrido un error');
    redirect(`/${locale}/admin/config?error=${errorMessage}`);
  }

  return (
    <>
      <h1 className="text-center text-5xl font-bold">
        Administración de datos
      </h1>
      <div className="mt-8 flex justify-evenly">
        <AdminAccountData />
        <div className="w-[350px] rounded border border-primary px-4 py-8">
          <h2 className="mb-4 text-2xl font-semibold">Redes sociales</h2>
          <AdminSocialMediaForm data={socialData} />
        </div>
      </div>
    </>
  );
};

export default ConfigPage;
