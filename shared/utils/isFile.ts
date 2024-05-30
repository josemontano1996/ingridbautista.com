export const isFile = (value: unknown): value is File => {
  return value instanceof File;
};
