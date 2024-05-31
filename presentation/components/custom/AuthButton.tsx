'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/presentation/components/ui/button';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { cn } from '@/shared/utils/utils';

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
