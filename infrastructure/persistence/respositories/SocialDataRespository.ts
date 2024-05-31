import { connectDB } from '../database-config';
import { IDbSocialMedia } from '../db-types';
import SocialMedia from '../models/SocialMedia';

export interface ISocialMediaRepository {
  getSocialMedia(): Promise<IDbSocialMedia | null>;
  updateSocialMedia(data: IDbSocialMedia): Promise<IDbSocialMedia>;
}

export class SocialMediaRepository implements ISocialMediaRepository {
  public async getSocialMedia(): Promise<IDbSocialMedia | null> {
    await connectDB();
    return SocialMedia.findOne().lean();
  }

  public async updateSocialMedia(
    data: IDbSocialMedia,
  ): Promise<IDbSocialMedia> {
    await connectDB();
    return SocialMedia.findOneAndUpdate(
      {},
      { ...data },
      { upsert: true, new: true },
    ).lean();
  }
}
