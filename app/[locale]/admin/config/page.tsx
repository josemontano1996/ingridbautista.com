import { redirect } from 'next/navigation';

import { AdminAccountData } from '@/app/[locale]/admin/config/AdminAccountData';
import { dbConnect, dbDisconnect } from '@/database/db';

import { serializeMongoData } from '@/shared/utils/serializeMongoData';
import { AdminSocialMediaForm } from './AdminSocialMediaForm';
import { ISocialData } from '@/shared/interfaces/ISocialData';
import SocialMedia from '@/models/SocialMedia';

export const revalidate = 0;

const ConfigPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  let socialData: ISocialData = {};

  try {
    await dbConnect();

    socialData = (await SocialMedia.findOne().lean()) || {};

    if (!socialData) {
      throw new Error();
    }

    socialData = serializeMongoData(socialData);
  } catch (error) {
    console.error(error);
    const errorMessage = encodeURI('Ha ocurrido un error');
    redirect(`/${locale}/admin/config?error=${errorMessage}`);
  } finally {
    await dbDisconnect();
  }

  return (
    <>
      <h1 className="text-center text-5xl font-bold">
        Administración de datos
      </h1>
      <div className="mt-8 flex justify-evenly">
        <AdminAccountData locale={locale} />
        <div className="w-[350px] rounded border border-primary px-4 py-8">
          <h2 className="mb-4 text-2xl font-semibold">Redes sociales</h2>
          <AdminSocialMediaForm data={socialData} />
        </div>
      </div>
    </>
  );
};

export default ConfigPage;
