import { AdminAccountData } from '@/app/[locale]/admin/config/AdminAccountData';
import { AdminSocialMediaForm } from './AdminSocialMediaForm';
import { ServerGetSocialMedia } from '@/application/use-cases/server-side/ServerSocialMedia';
import { SocialMediaRepository } from '@/infrastructure/persistence/repositories/SocialMediaRespository';

const ConfigPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const socialData = await ServerGetSocialMedia({
    socialMediaRepository: new SocialMediaRepository(),
  });

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
