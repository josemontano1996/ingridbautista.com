import { revalidateTag, unstable_cache } from 'next/cache';

type Callback = (...args: any[]) => Promise<any>;

export class CacheService {
  public cacheQuery(fn: Callback, tags: string[], options?: Object): Callback {
    return unstable_cache(fn, tags, { tags, ...options });
  }

  public revalidateCacheTag(tag: string): void {
    revalidateTag(tag);
  }

}
