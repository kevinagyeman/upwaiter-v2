'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CompanyFormSchema, companyFormSchema } from '@/schemas/company-schema';
import { getCompanyById, updateCompany } from '@/services/company-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStackApp, useUser } from '@stackframe/stack';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Profile() {
  const app = useStackApp();
  const user = useUser();
  const [_, setCompanyData] = useState<CompanyFormSchema>();

  useEffect(() => {
    getCompanyData();
  }, [user]);

  const getCompanyData = async () => {
    if (user) {
      const company = await getCompanyById(user.id);
      console.log(company);

      setCompanyData(company);
      form.reset({
        about: '',
        vatNumber: company.vatNumber,
        name: company.name,
        email: company.email,
      });
    }
  };

  const form = useForm<CompanyFormSchema>({
    resolver: zodResolver(companyFormSchema),
  });

  const updateCompanyData: SubmitHandler<CompanyFormSchema> = async (data) => {
    try {
      console.log(data);

      if (user) {
        await updateCompany(user.id, data);
      }
    } catch (error) {
      console.log('Errore durante la creazione del jobpost:', error);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <Button asChild>
        <Link href={`/company/${user?.id}`} prefetch>
          anteprima profilo
        </Link>
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(updateCompanyData)}
          className='space-y-2  max-w-sm w-full'
        >
          <div>
            <h1 className=' text-2xl font-semibold'>Modifica il tuo cv</h1>
            <p className='text-muted-foreground'>
              Modifica il tuo profilo affinche le aziende possano
            </p>
          </div>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Input placeholder={field.name} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='vatNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Input placeholder={field.name} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Input placeholder={field.name} {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='about'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{field.name}</FormLabel>
                <FormControl>
                  <Textarea placeholder={field.name} {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            role='submit'
            disabled={form.formState.isSubmitting}
            className='w-full'
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='animate-spin' />
            ) : (
              'Aggiorna il mio profilo'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
