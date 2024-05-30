import mongoose, { Schema, model, Model } from 'mongoose';
import { ISocialData } from '@/shared/interfaces/ISocialData';

const socialMediaSchema = new Schema(
  {
    whatsapp: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },
  { timestamps: true },
);

const SocialMedia: Model<ISocialData> =
  mongoose.models.SocialMedia ||
  model<ISocialData>('SocialMedia', socialMediaSchema);

export default SocialMedia;
