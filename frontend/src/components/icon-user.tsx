'use client';

import { gql, useMutation } from '@apollo/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export default function IconUser({ user }: any) {
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
          <div className='h-8 w-8 rounded-full bg-green-200'></div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-56'>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => mutateFunction()}
              className='cursor-pointer'
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
