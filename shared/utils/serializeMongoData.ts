type SerializableData = Record<string, any>;

export const serializeMongoData = (data: SerializableData): any => {
  return JSON.parse(JSON.stringify(data));
};
