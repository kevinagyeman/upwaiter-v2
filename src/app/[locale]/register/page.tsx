'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link } from '@/i18n/routing';
import {
  registerFormSchema,
  RegisterFormSchema,
} from '@/schemas/register-schema';
import { createCompany } from '@/services/company-service';
import { createWaiter } from '@/services/waiter-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStackApp } from '@stackframe/stack';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Register() {
  const app = useStackApp();
  const router = useRouter();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'waiter',
      companyName: '',
      vatNumber: '',
    },
  });

  const registerUser: SubmitHandler<RegisterFormSchema> = async (data) => {
    console.log(data);

    try {
      await app.signUpWithCredential({
        email: data.email,
        password: data.password,
        noRedirect: true,
      });

      const user = await app.getUser();
      if (user) {
        if (data.role === 'company' && data.companyName && data.vatNumber) {
          await user.update({
            clientMetadata: {
              role: data.role,
              companyTableId: user.id,
            },
          });
          await createCompany({
            id: user.id,
            name: data.companyName,
            email: data.email,
            vatNumber: data.vatNumber,
          });
        }

        if (data.role === 'waiter') {
          await user.update({
            clientMetadata: {
              role: data.role,
              waiterTableId: user.id,
            },
          });
          await createWaiter({
            id: user.id,
            email: data.email,
          });
        }
        router.push('/');
      }
    } catch (error) {
      const user = await app.getUser();
      if (user) {
        console.log(
          "Errore durante la registrazione, eliminazione dell'utente:",
          error
        );
        await user.delete();
      }
      console.log('Errore durante la registrazione:', error);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(registerUser)}
            className='space-y-2  max-w-sm w-full'
          >
            <div>
              <h1 className=' text-2xl font-semibold'>Register</h1>
              <p className='text-muted-foreground'>register</p>
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={field.name} {...field} type='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={field.name}
                      {...field}
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        id='isCompany'
                        {...field}
                        checked={form.watch('role') === 'company'}
                        onCheckedChange={(e) => {
                          const isChecked = e.valueOf();
                          form.setValue(
                            'role',
                            isChecked ? 'company' : 'waiter'
                          );
                        }}
                      />
                      <label
                        htmlFor='isCompany'
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        Sono un'azienda
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch('role') === 'company' && (
              <>
                <FormField
                  control={form.control}
                  name='companyName'
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
              </>
            )}
            <Button
              role='submit'
              disabled={form.formState.isSubmitting}
              className='w-full'
            >
              {form.formState.isSubmitting ? (
                <Loader2 className='animate-spin' />
              ) : (
                'Register'
              )}
            </Button>
            <Button variant='ghost' role='button' asChild className='w-full'>
              <Link href='/login'>Login</Link>
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
