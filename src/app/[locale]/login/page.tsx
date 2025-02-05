'use client';

import FormError from '@/components/form-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/i18n/routing';
import { useUserStore } from '@/store/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStackApp } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Login() {
  const app = useStackApp();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  type LoginFormSchema = z.infer<typeof loginFormSchema>;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const loginForm: SubmitHandler<LoginFormSchema> = async (data) => {
    try {
      await app.signInWithCredential({
        email: data.email,
        password: data.password,
        noRedirect: true,
      });
      const user = await app.getUser();
      if (user) {
        setUser(user);
        router.push('/');
      } else {
        alert('Errore durante il login');
      }
    } catch (error) {
      console.log('Errore durante il login:', error);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <form
        onSubmit={handleSubmit(loginForm)}
        className='space-y-4 max-w-sm w-full'
      >
        <div>
          <h1 className=' text-2xl font-semibold'>Login</h1>
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
        </div>

        <Button role='submit' disabled={isSubmitting} className='w-full'>
          {isSubmitting ? 'Loading...' : 'Login'}
        </Button>
        <Button variant='ghost' role='button' asChild className='w-full'>
          <Link href='/login'>Register</Link>
        </Button>
        {errors.root && <FormError>{errors.root.message}</FormError>}
      </form>
    </div>
  );
}
