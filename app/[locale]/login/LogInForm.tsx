'use client';

import * as z from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormButton } from '../../../components/custom/FormButton';
import { useStatusStore } from '@/presentation/state-management/statusStore';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

const LogInForm = () => {
  const { locale } = useParams();
  const router = useRouter();

  const setIsLoadingStatusStore = useStatusStore((state) => state.setIsLoading);
  const clearStatusStore = useStatusStore((state) => state.clearStatusStore);
  const setErrorStatusStore = useStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    clearStatusStore();

    const { email, password } = values;

    if (!email || !password) {
      setErrorStatusStore('Please fill in all fields');
      return;
    }

    setIsLoadingStatusStore(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!result || !result.ok) {
      setErrorStatusStore(
        'An error ocurred, please check your data or contact the admin.',
      );
      return;
    }

    clearStatusStore();
    router.push(`/${locale}/admin/menu`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-20 max-w-[600px] space-y-9 border border-primary px-12 py-6"
      >
        <h1 className="text-center text-5xl">Authentication</h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn('text-3xl')}>Username</FormLabel>
              <FormControl>
                <Input {...field} className={cn('text-2xl')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn('text-3xl')}>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" className={cn('text-2xl')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col items-center">
          <FormButton text="Submit" loadingText="Submitting..." />
        </div>
      </form>
    </Form>
  );
};

export default LogInForm;
