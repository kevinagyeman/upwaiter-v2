'use client';

import FormError from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/i18n/routing';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStackApp } from '@stackframe/stack';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Register() {
  const app = useStackApp();

  const registerFormSchema = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(['company', 'waiter']).default('waiter'),
      companyName: z.string().optional(),
      vatNumber: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.role === 'company') {
          return !!data.companyName && !!data.vatNumber;
        }
        return true;
      },
      {
        message: 'Company fields are required when registering as a company',
        path: ['companyName', 'vatNumber'],
      }
    );

  type RegisterFormSchema = z.infer<typeof registerFormSchema>;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const registerForm: SubmitHandler<RegisterFormSchema> = async (data) => {
    try {
      await app.signUpWithCredential({
        email: data.email,
        password: data.password,
        noRedirect: true,
      });

      const user = await app.getUser();
      if (user) {
        await user.update({
          clientMetadata: {
            role: data.role,
            ...(data.role === 'company' && {
              companyName: data.companyName,
              vatNumber: data.vatNumber,
            }),
          },
        });
      }
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
      alert('Errore durante la registrazione. Riprova.');
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <form
        onSubmit={handleSubmit(registerForm)}
        className='space-y-4 max-w-sm w-full'
      >
        <div>
          <h1 className=' text-2xl font-semibold'>Register</h1>
          <p className='text-muted-foreground'>Accedi al tuo account</p>
        </div>

        <div className='space-y-2'>
          <div>
            <Label>Email</Label>
            <Input {...register('email')} role='email' placeholder='Email' />
            {errors.email && <FormError>{errors.email.message}</FormError>}
          </div>
          <div>
            <Label>Scegli una password</Label>
            <Input
              {...register('password')}
              role='password'
              placeholder='Password'
            />
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
          </div>
          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              id='isCompany'
              checked={watch('role') === 'company'}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setValue('role', isChecked ? 'company' : 'waiter');
              }}
            />
            <label
              htmlFor='isCompany'
              className='text-sm font-medium leading-none'
            >
              Sono un'azienda
            </label>
          </div>
          {watch('role') === 'company' && (
            <>
              <div>
                <Label>Nome azienda</Label>
                <Input
                  {...register('companyName')}
                  role='text'
                  placeholder='Nome azienda'
                />
                {errors.companyName && (
                  <FormError>{errors.companyName.message}</FormError>
                )}
              </div>
              <div>
                <Label>Partita IVA</Label>
                <Input
                  {...register('vatNumber')}
                  role='text'
                  placeholder='Partita IVA'
                />
                {errors.vatNumber && (
                  <FormError>{errors.vatNumber.message}</FormError>
                )}
              </div>
            </>
          )}
        </div>

        <Button role='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? 'Loading...' : 'Register'}
        </Button>
        <Button variant='ghost' role='button' asChild className='w-full'>
          <Link href='/login'>Login</Link>
        </Button>
        {errors.root && <FormError>{errors.root.message}</FormError>}
      </form>
    </div>
  );
}
