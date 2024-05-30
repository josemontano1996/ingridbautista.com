'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LogOutIcon, UserIcon } from 'lucide-react';

const AuthButton = () => {
  const { data: session } = useSession();

  return session ? (
    <Button
      onClick={() => signOut()}
      variant={'ghost'}
      className={cn('text-lg')}
    >
      <LogOutIcon />
      Log out
    </Button>
  ) : (
    <Button
      onClick={() => signIn()}
      variant={'ghost'}
      className={cn('text-lg')}
    >
      <UserIcon />
      Admin
    </Button>
  );
};

export default AuthButton;
