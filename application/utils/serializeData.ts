type SerializableData = Record<string, any>;

export const serializeData = <T extends SerializableData>(data: T): T => {
  let serializedData = { ...data };

  if (data._id && typeof data._id === 'object') {
    serializedData = JSON.parse(JSON.stringify(data));
  }
  return serializedData;
};
