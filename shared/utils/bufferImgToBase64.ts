export const bufferImgToBase64 = async (image: File): Promise<string> => {
  const buffer = await image.arrayBuffer();
  const base64Image = Buffer.from(buffer).toString('base64');
  return base64Image;
};
