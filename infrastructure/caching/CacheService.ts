import { revalidateTag, unstable_cache } from 'next/cache';

type Callback<T> = (...args: any[]) => Promise<T>;

export class CacheService {
  public static async cacheQuery<T>(
    fn: Callback<T>,
    tags: string[],
    options?: Object,
  ): Promise<T> {
    const cachedData = unstable_cache(fn, tags, { tags, ...options });

    return cachedData();
  }

  public static revalidateCacheTag(tags: string[]): void {
    for (const tag of tags) {
      revalidateTag(tag);
    }
  }
}
