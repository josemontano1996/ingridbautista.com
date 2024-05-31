import NextAuth from 'next-auth';
import { authOptions } from '@/infrastructure/authentication/next-auth-config';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
