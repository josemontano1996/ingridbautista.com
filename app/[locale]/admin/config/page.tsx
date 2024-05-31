import { redirect } from 'next/navigation';

import { AdminAccountData } from '@/app/[locale]/admin/config/AdminAccountData';

import { AdminSocialMediaForm } from './AdminSocialMediaForm';
import { serializeData } from '@/application/utils/serializeData';
import { SocialMediaDto } from '@/application/dto/SocialMediaDto';
import { ServerGetSocialMedia } from '@/application/use-cases/server-side/ServerSocialData';
import { SocialMediaRepository } from '@/infrastructure/persistence/respositories/SocialDataRespository';


const ConfigPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  let socialData: SocialMediaDto = {};

  try {
    socialData = await ServerGetSocialMedia({
      socialMediaRepository: new SocialMediaRepository(),
    });

    socialData = serializeData(socialData);
  } catch (error) {
    console.error(error);
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
