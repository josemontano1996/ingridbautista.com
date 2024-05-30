import Image from 'next/image';

/**
 * Renders the logo image for Chef Bautista.
 * @component LogoImage
 * @returns The logo image component.
 */
export const LogoImage = () => {
  return <Image src={'/assets/images/logo.webp'} alt="Chef Bautista Logo" objectFit='cover' width={100} height={100}/>;
};
