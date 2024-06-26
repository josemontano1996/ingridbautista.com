'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { contactFormSchema } from '@/shared/lib/schemas/contactFormSchema';
import { IActionResponse } from './IActionResponses';
import { validateSchema } from '@/infrastructure/validation/validateSchema';
import { ServerErrorHandler } from '../errors/Errors';

export const sendEmailAction = async (
  values: z.infer<typeof contactFormSchema>,
): Promise<IActionResponse> => {
  try {
    const parsed = validateSchema(contactFormSchema, values);

    if (!parsed.success) {
      return {
        success: false,
        message: 'invalid-data',
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailBody = `
    <h5>Nuevo mensaje de:</h5>
    <h4>${parsed.data.name}</h4>
    <h5>Email: </h5>
    <h4>${parsed.data.email}</h4>
    <p><strong>Mensaje: </strong>${parsed.data.message}</p>
    <p>Email id: ${crypto.randomUUID()}</p>
      `;

    const { data, error } = await resend.emails.send({
      from: process.env.DOMAIN_EMAIL!,
      to: [process.env.NEXT_PUBLIC_COMMUNICATION_EMAIL_ADDRESS!],
      reply_to: parsed.data.email,
      subject: parsed.data.subjet,
      html: emailBody,
    });

    if (error) {
      throw new Error(error.message);
    }
    console.log(data);
    return {
      success: true,
    };
  } catch (error) {
    const serverHandlerInstance = new ServerErrorHandler(error);
    serverHandlerInstance.logError();

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};
