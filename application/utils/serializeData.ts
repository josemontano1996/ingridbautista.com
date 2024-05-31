import { ObjectId } from 'mongodb';

type SerializableData = Record<string, any>;

export const serializeData = <T extends SerializableData>(data: T): T => {
  if (data._id && data._id instanceof ObjectId) {
    data = JSON.parse(JSON.stringify(data));
  }
  return data;
};
