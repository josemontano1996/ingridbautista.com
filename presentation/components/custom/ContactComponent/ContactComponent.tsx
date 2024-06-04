import { SocialMediaRepository } from '@/infrastructure/persistence/repositories/SocialMediaRespository';
import { ContactDialog } from './ContactDialog';
import { ServerGetSocialMedia } from '@/application/use-cases/server-side/ServerSocialMedia';

export const ContactComponent = async ({ locale }: { locale: string }) => {
  const socialMedia = await ServerGetSocialMedia({
    socialMediaRepository: new SocialMediaRepository(),
  });

  return <ContactDialog socialMedia={socialMedia} />;
};
