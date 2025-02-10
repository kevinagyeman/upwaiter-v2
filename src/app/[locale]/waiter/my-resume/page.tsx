'use client';

import FormError from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createJobPost } from '@/services/jobpost.services';
import { updateWaiter } from '@/services/waiter.services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStackApp } from '@stackframe/stack';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Page() {
  const app = useStackApp();

  const waiterFormSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: 'Il nome deve avere almeno 2 caratteri' })
      .optional(),
    lastName: z
      .string()
      .min(2, { message: 'Il cognome deve avere almeno 2 caratteri' })
      .optional(),
    email: z.string().email({ message: "Inserisci un'email valida" }),
    country: z.string().optional(),
    region: z.string().optional(),
    province: z.string().optional(),
    streetAddress: z.string().optional(),
    contactNumber: z
      .string()
      .regex(/^\+?\d{7,15}$/, {
        message: 'Inserisci un numero di telefono valido',
      })
      .optional(),
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'La data deve essere nel formato YYYY-MM-DD',
      })
      .optional(),
    resume: z.string().optional(),
    about: z
      .string()
      .max(1000, {
        message: "Il campo 'about' può contenere al massimo 1000 caratteri",
      })
      .optional(),
    // yearsOfExperience: z
    //   .number()
    //   .int()
    //   .min(0, { message: "L'esperienza lavorativa non può essere negativa" })
    //   .optional()
    //   .default(0),
    firstLanguage: z.string().optional(),
    secondLanguage: z.string().optional(),
    thirdLanguage: z.string().optional(),
    isAvailableToWork: z.boolean().default(true),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

  type WaiterFormSchema = z.infer<typeof waiterFormSchema>;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<WaiterFormSchema>({
    resolver: zodResolver(waiterFormSchema),
  });

  const waiterForm: SubmitHandler<WaiterFormSchema> = async (data) => {
    try {
      const user = await app.getUser();

      if (user) {
        const parsedData = {
          ...data,
          dateOfBirth: data.dateOfBirth
            ? new Date(data.dateOfBirth)
            : undefined,
        };

        await updateWaiter(user.id, parsedData);
      }
    } catch (error) {
      console.log('Errore durante la creazione del jobpost:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(waiterForm)}
      className='space-y-4 max-w-sm w-full'
    >
      <div className='space-y-2'>
        {/* Nome */}
        <div>
          <Label>Nome</Label>
          <Input {...register('firstName')} type='text' placeholder='Nome' />
          {errors.firstName && (
            <FormError>{errors.firstName.message}</FormError>
          )}
        </div>

        {/* Cognome */}
        <div>
          <Label>Cognome</Label>
          <Input {...register('lastName')} type='text' placeholder='Cognome' />
          {errors.lastName && <FormError>{errors.lastName.message}</FormError>}
        </div>

        {/* Email */}
        <div>
          <Label>Email</Label>
          <Input {...register('email')} type='email' placeholder='Email' />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </div>

        {/* Numero di telefono */}
        <div>
          <Label>Numero di telefono</Label>
          <Input
            {...register('contactNumber')}
            type='text'
            placeholder='+1234567890'
          />
          {errors.contactNumber && (
            <FormError>{errors.contactNumber.message}</FormError>
          )}
        </div>

        {/* Data di nascita */}
        <div>
          <Label>Data di nascita</Label>
          <Input
            {...register('dateOfBirth')}
            type='date'
            placeholder='YYYY-MM-DD'
          />
          {errors.dateOfBirth && (
            <FormError>{errors.dateOfBirth.message}</FormError>
          )}
        </div>

        {/* Indirizzo */}
        <div>
          <Label>Indirizzo</Label>
          <Input
            {...register('streetAddress')}
            type='text'
            placeholder='Via, numero civico'
          />
          {errors.streetAddress && (
            <FormError>{errors.streetAddress.message}</FormError>
          )}
        </div>

        {/* Paese */}
        <div>
          <Label>Paese</Label>
          <Input {...register('country')} type='text' placeholder='Italia' />
          {errors.country && <FormError>{errors.country.message}</FormError>}
        </div>

        {/* Regione */}
        <div>
          <Label>Regione</Label>
          <Input {...register('region')} type='text' placeholder='Lazio' />
          {errors.region && <FormError>{errors.region.message}</FormError>}
        </div>

        {/* Provincia */}
        <div>
          <Label>Provincia</Label>
          <Input {...register('province')} type='text' placeholder='Roma' />
          {errors.province && <FormError>{errors.province.message}</FormError>}
        </div>

        {/* Lingue */}
        <div>
          <Label>Lingua madre</Label>
          <Input
            {...register('firstLanguage')}
            type='text'
            placeholder='Italiano'
          />
          {errors.firstLanguage && (
            <FormError>{errors.firstLanguage.message}</FormError>
          )}
        </div>

        <div>
          <Label>Seconda lingua</Label>
          <Input
            {...register('secondLanguage')}
            type='text'
            placeholder='Inglese'
          />
          {errors.secondLanguage && (
            <FormError>{errors.secondLanguage.message}</FormError>
          )}
        </div>

        <div>
          <Label>Terza lingua</Label>
          <Input
            {...register('thirdLanguage')}
            type='text'
            placeholder='Francese'
          />
          {errors.thirdLanguage && (
            <FormError>{errors.thirdLanguage.message}</FormError>
          )}
        </div>

        {/* Anni di esperienza */}
        {/* <div>
          <Label>Anni di esperienza</Label>
          <Input {...register('yearsOfExperience')} type='number' min='0' />
          {errors.yearsOfExperience && (
            <FormError>{errors.yearsOfExperience.message}</FormError>
          )}
        </div> */}

        {/* Disponibilità al lavoro */}
        <div className='flex items-center space-x-2'>
          <input
            {...register('isAvailableToWork')}
            type='checkbox'
            className='h-4 w-4'
          />
          <Label>Disponibile a lavorare</Label>
        </div>

        {/* CV */}
        <div>
          <Label>Link al CV</Label>
          <Input {...register('resume')} type='text' placeholder='URL del CV' />
          {errors.resume && <FormError>{errors.resume.message}</FormError>}
        </div>

        {/* Descrizione personale */}
        <div>
          <Label>Descrizione</Label>
          <Textarea
            {...register('about')}
            rows={4}
            placeholder="Parla un po' di te..."
          />
          {errors.about && <FormError>{errors.about.message}</FormError>}
        </div>

        {/* Pulsante di invio */}
        <Button role='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? <Loader2 className='animate-spin' /> : 'Pubblica'}
        </Button>
      </div>
    </form>
  );
}
