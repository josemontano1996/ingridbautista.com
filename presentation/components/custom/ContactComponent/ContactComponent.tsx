import { ContactDialog } from './ContactDialog';
import { redirect } from 'next/navigation';
import { ISocialData } from '@/shared/interfaces/ISocialData';
import { connectDB } from '@/infrastructure/persistence/database-config';
import SocialMedia from '@/infrastructure/persistence/models/SocialMedia';

export const ContactComponent = async ({ locale }: { locale: string }) => {
  let socialData: ISocialData = {};
  try {
    await connectDB();
    socialData = (await SocialMedia.findOne().lean()) || {};

    if (!socialData) {
      throw new Error();
    }

    socialData = JSON.parse(JSON.stringify(socialData));
  } catch (error) {
    console.error(error);
    const errorMessage = encodeURI('Ha ocurrido un error');
    redirect(`/${locale}/admin/config?error=${errorMessage}`);
  }
  return <ContactDialog socialData={socialData} />;
};
