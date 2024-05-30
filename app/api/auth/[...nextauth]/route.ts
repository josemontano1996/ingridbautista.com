import { authOptions } from '@/shared/lib/auth/next-auth-config';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
