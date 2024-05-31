import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserRepository } from '../persistence/respositories/UserRepository';
import { UserDto } from '@/application/dto/UserDto';
import { serverLogInUseCase } from '@/application/use-cases/server-side/ServerAuth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const userResult = await serverLogInUseCase(
          { userRepository: new UserRepository() },
          { email: credentials!.email, password: credentials!.password },
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
    maxAge: 7 * 24 * 60 * 60,
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
      session.user = token.user as UserDto;
      return session;
    },
  },
};
