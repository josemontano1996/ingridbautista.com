import mongoose, { Schema, model, Model } from 'mongoose';
import { IDbSocialData } from '../db-types';

const socialMediaSchema = new Schema(
  {
    whatsapp: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },
  { timestamps: true },
);

const SocialMedia: Model<IDbSocialData> =
  mongoose.models.SocialMedia ||
  model<IDbSocialData>('SocialMedia', socialMediaSchema);

export default SocialMedia;
