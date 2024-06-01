import { ObjectId } from 'mongodb';

type SerializableData = Record<string, any>;

export const serializeData = <T extends SerializableData>(data: T): T => {
  let serializedData = { ...data };

  if (data._id && data._id instanceof ObjectId) {
    serializedData = JSON.parse(JSON.stringify(data));
  }
  return serializedData;
};
