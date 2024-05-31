import { getServerSession } from 'next-auth';
import { Session } from 'next-auth';
import { authOptions } from './next-auth-config';

/**
 * Retrieves the authentication session.
 * @returns  The authentication session.
 */
export const getAuthSession = async () => {
  return (await getServerSession(authOptions)) as Session;
};
