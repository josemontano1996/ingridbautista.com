import { loginUser } from '@/database/UsersDb';
import { IAuthUser } from '@/shared/interfaces/IAuthUser';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const userResult = await loginUser(
          credentials?.email!,
          credentials?.password!,
        );

        if (!userResult) {
          return null; // Login failed, return null
        }
        return userResult; // Login successful, return user object
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },

  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as IAuthUser;
      return session;
    },
  },
};
