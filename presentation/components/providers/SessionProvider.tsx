'use client';

import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

/**
 * AuthProvider component.
 * 
 * @param children - The child components to render.
 * @param rest - Additional props for the AuthProvider component.
 * @returns The rendered AuthProvider component.
 */
const AuthProvider = ({ children, ...rest }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
