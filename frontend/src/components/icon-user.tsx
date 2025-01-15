'use client';

import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export default function IconUser() {
  const [mutateFunction] = useMutation(LOGOUT_MUTATION);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* {information.profileImageLink && (
            <Image
              className='h-8 w-8 rounded-full'
              src={information.profileImageLink}
              alt='profile'
              width={32}
              height={32}
            />
          )} */}
          <div className='h-8 w-8 rounded-full'></div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-56'>
          <DropdownMenuGroup>
            {status === 'authenticated' ? (
              <DropdownMenuItem
                onClick={() => mutateFunction()}
                className='cursor-pointer'
              >
                Logout
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className='cursor-pointer' asChild>
                <Link href='/login' rel='canonical' prefetch={true}>
                  Login
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
