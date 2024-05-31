import mongoose, { Schema, model, Model } from 'mongoose';
import { IDbSocialMedia } from '../db-types';

const socialMediaSchema = new Schema(
  {
    whatsapp: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },
  { timestamps: true },
);

const SocialMedia: Model<IDbSocialMedia> =
  mongoose.models.SocialMedia ||
  model<IDbSocialMedia>('SocialMedia', socialMediaSchema);

export default SocialMedia;
