import { dbConnect, dbDisconnect } from '@/database/db';
import { ContactDialog } from './ContactDialog';
import { redirect } from 'next/navigation';
import { ISocialData } from '@/shared/interfaces/ISocialData';
import SocialMedia from '@/models/SocialMedia';
import { serializeMongoData } from '@/shared/utils/serializeMongoData';

export const ContactComponent = async ({ locale }: { locale: string }) => {
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
  }
  return <ContactDialog socialData={socialData} />;
};
