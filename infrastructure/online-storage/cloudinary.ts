import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const uploadImageToCloudinary = async (
  imageBase64String: string,
): Promise<string> => {
  return cloudinary.uploader
    .upload(`data:image/webp;base64,${imageBase64String}`)
    .then((r) => r.secure_url);
};

export const updateImageFromCloudinary = async (
  imageBase64String: string,
  imageUrl: string,
): Promise<string> => {
  //Deleting old image
  const successDeletingImage = await deleteImageFromCloudinary(imageUrl);

  if (!successDeletingImage) {
    throw new Error('Error deleting cloudinary image');
  }

  //Add the new image
  return cloudinary.uploader
    .upload(`data:image/webp;base64,${imageBase64String}`)
    .then((r) => r.secure_url);
};

export const deleteImageFromCloudinary = async (
  imageUrl: string,
): Promise<any> => {
  const publicId = extractCloudinaryPublicId(imageUrl);

  if (!publicId) {
    throw new Error('Error extracting public id from image url');
  }

  return cloudinary.uploader.destroy(publicId);
};

export const extractCloudinaryPublicId = (imageUrl: string): string => {
  const startIndex = imageUrl.lastIndexOf('/') + 1;
  const endIndex = imageUrl.lastIndexOf('.');

  return imageUrl.substring(startIndex, endIndex);
};
