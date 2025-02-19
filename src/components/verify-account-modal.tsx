'use client';

import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@stackframe/stack';
import { useState, useEffect } from 'react';

export default function VerifyAccountModal() {
  const user = useUser();
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const isUserVerified = user && !user?.primaryEmailVerified ? true : false;

  const sendEmail = async () => {
    try {
      await user?.sendVerificationEmail();
      setIsEmailSended(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await user?.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isEmailSended) {
      setCountdown(30);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsEmailSended(false); // Rende di nuovo visibile il pulsante
            return 30; // Reset del countdown
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isEmailSended]);

  return (
    <Dialog open={isUserVerified}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Il tuo account non è verificato</DialogTitle>
          <DialogDescription>
            Verifica la mail attraverso il link che ti abbiamo inviato per
            accedere al portale
          </DialogDescription>
        </DialogHeader>
        <p>{user?.primaryEmail}</p>
        {!isEmailSended ? (
          <Button onClick={sendEmail}>Invia email di verifica</Button>
        ) : (
          <p>La mail può essere inviata di nuovo fra {countdown} secondi.</p>
        )}
        <Button
          variant={'secondary'}
          size={'sm'}
          className={'w-fit'}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </DialogContent>
    </Dialog>
  );
}
