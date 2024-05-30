export const imageToBase64String = async (image: File) => {
  const buffer = await image.arrayBuffer();
  return Buffer.from(buffer).toString('base64');
};
