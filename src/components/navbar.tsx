'use client';

import { useUserStore } from '@/store/user';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserButton, useUser } from '@stackframe/stack';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LanguageSelector from './language-selector';
import ThemeChanger from './theme-changer';
import { Button } from './ui/button';

const Navbar = () => {
  const t = useTranslations('navbar');
  const user = useUser();

  let navigation = [];

  if (user?.clientMetadata?.role === 'waiter') {
    navigation = [
      { name: `Annunci`, href: '/jobposts' },
      { name: `Il mio curriculum`, href: '/waiter/my-resume' },
      { name: `Le mie candidature`, href: '/waiter/my-applications' },
    ];
  } else if (user?.clientMetadata?.role === 'company') {
    navigation = [
      { name: `I miei annunci`, href: '/company/my-jobposts' },
      { name: `Profilo azienda`, href: '/company/profile' },
      { name: `Crea un annuncio`, href: '/company/create-jobpost' },
      { name: `elenco camerieri`, href: '/company/waiters' },
    ];
  } else {
    navigation = [
      { name: `${t('home')}`, href: '/' },
      { name: `${t('login')}`, href: '/login' },
      { name: `${t('register')}`, href: '/register' },
    ];
  }

  return (
    <>
      <Disclosure
        as='nav'
        className='sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm'
      >
        {({ open }: any) => (
          <>
            <div className='mx-auto container'>
              <div className='relative flex h-16 items-center justify-between'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-black hover:text-black   dark:text-white  dark:hover:text-white '>
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                  <ThemeChanger />
                </div>
                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                  <div className='flex flex-shrink-0 items-center'>
                    <Link href='/'>
                      <Logo />
                    </Link>
                  </div>
                  {/* Desktop menu, show/hide based on menu state. */}
                  <div className='hidden sm:ml-6 sm:block w-full'>
                    <div className='flex space-x-4'>
                      {navigation.map((item) => (
                        <Button asChild variant={'ghost'} key={item.name}>
                          <Link href={item.href}>{item.name}</Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <div className='hidden sm:block'>
                    {user && !user.primaryEmailVerified && (
                      <Button
                        onClick={async () => await user.sendVerificationEmail()}
                        size={'sm'}
                        variant={'link'}
                      >
                        verifica account
                      </Button>
                    )}
                    {user && <>{user.primaryEmail}</>}
                    <ThemeChanger />
                  </div>
                  <LanguageSelector />

                  {/* <IconUser /> */}
                  <UserButton />
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='space-y-1 px-2 pb-3 pt-2'>
                {/* Mobile menu, show/hide based on menu state. */}
                {navigation.map((item, index: number) => (
                  <Link
                    href={item.href}
                    key={index}
                    className={
                      'text-light hover:text-light block rounded-md px-3 py-2 text-base font-medium'
                    }
                  >
                    <Disclosure.Button>{item.name}</Disclosure.Button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;

const Logo = () => {
  return (
    <div className='flex items-center gap-4'>
      <svg
        id='upwaiter_logo'
        className='h-5 w-auto fill-black dark:fill-white'
        data-name='upwaiter_logo'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 30 17.32'
      >
        <defs></defs>
        <title>icona-up</title>
        <circle className='cls-1' cx='27.68' cy='15' r='2.32' />
        <circle className='cls-1' cx='27.68' cy='8.66' r='2.32' />
        <circle className='cls-1' cx='27.68' cy='2.32' r='2.32' />
        <circle className='cls-1' cx='21.34' cy='11.83' r='2.32' />
        <circle className='cls-1' cx='21.34' cy='5.49' r='2.32' />
        <circle className='cls-1' cx='2.32' cy='2.32' r='2.32' />
        <circle className='cls-1' cx='2.32' cy='8.66' r='2.32' />
        <circle className='cls-1' cx='2.32' cy='15' r='2.32' />
        <circle className='cls-1' cx='8.66' cy='5.49' r='2.32' />
        <circle className='cls-1' cx='8.66' cy='11.83' r='2.32' />
        <circle className='cls-1' cx='15' cy='8.66' r='2.32' />
      </svg>
      <span className='text-2xl font-extrabold hidden sm:block'>
        Upwaiter<span className='text-green-500'>.com</span>
      </span>
    </div>
  );
};
