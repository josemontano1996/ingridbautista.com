'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { PhoneIcon } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';

import { Button, buttonVariants } from '../../ui/button';
import { Input } from '../../ui/input';
import WhatsApp from '../icon-components/WhatsappComponent';
import Facebook from '../icon-components/FacebookComponent';
import Instagram from '../icon-components/InstagramComponent';
import Gmail from '../icon-components/GmailComponent';
import { useStatusStore } from '@/presentation/state-management/statusStore';
import { sendEmailAction } from '@/application/actions/email-actions';
import { contactFormSchema } from '@/shared/lib/schemas/contactFormSchema';
import { Textarea } from '@/presentation/components/ui/textarea';
import { cn } from '@/shared/utils/utils';
import { SocialMediaDto } from '@/application/dto/SocialMediaDto';
import { FormButton } from '../FormButton';

export const ContactDialog = ({
  socialMedia,
}: {
  socialMedia: SocialMediaDto;
}) => {
  const { whatsapp, facebook, instagram } = socialMedia;
  const setSuccessStatusStore = useStatusStore((state) => state.setSuccess);
  const setErrorStatusStore = useStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subjet: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const { success, message } = await sendEmailAction(values);

    if (!success) {
      return setErrorStatusStore(
        message ? message : 'An error occurred while sending the email',
      );
    }

    setSuccessStatusStore('Email sent successfully');
  }
  return (
    <Dialog>
      <DialogTrigger className="h-full">
        <PhoneIcon />
      </DialogTrigger>
      <DialogContent className={cn('w-[550px]')}>
        <DialogHeader>
          <DialogTitle className={cn('text-center text-3xl')}>
            Contact Data
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div>
            <ul className="flex justify-center gap-6 [&>li>a]:h-full [&>li>a]:w-full [&>li]:h-[24px] [&>li]:w-[24px]">
              {whatsapp && (
                <li>
                  <a
                    target="_blank"
                    href={`https://wa.me/${whatsapp}`}
                  >
                    <WhatsApp height={24} width={24} />
                  </a>
                </li>
              )}
              <li>
                <a
                  target="_blank"
                  href={`mailto:${process.env.NEXT_PUBLIC_COMMUNICATION_EMAIL_ADDRESS}`}
                >
                  <Gmail height={24} width={24} />
                </a>
              </li>
              {facebook && (
                <li>
                  <a target="_blank" href={facebook}>
                    <Facebook height={24} width={24} />
                  </a>
                </li>
              )}
              {instagram && (
                <li>
                  <a target="_blank" href={instagram}>
                    <Instagram height={24} width={24} />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </DialogDescription>
        <div className="my-4">
          <h1 className="text-center text-3xl">Contact form</h1>
          <Form {...form}>
            <form
              className="space-y-6 rounded-xl p-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subjet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjet</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className={cn('resize-none')}
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <FormButton form={form} text="Send" loadingText="Sending..." />
                <DialogClose
                  className={cn(buttonVariants({ variant: 'ghost' }))}
                >
                  Close
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
