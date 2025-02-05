// 'use client';

// import { useUserStore } from '@/store/user';
// import { signOut } from '@firebase/auth';
// import { auth } from '../firebase';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';

// export default function IconUser() {
//   const clearUser = useUserStore((state) => state.clearUser);
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       clearUser();
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           {/* {information.profileImageLink && (
//             <Image
//               className='h-8 w-8 rounded-full'
//               src={information.profileImageLink}
//               alt='profile'
//               width={32}
//               height={32}
//             />
//           )} */}
//           <div className='h-8 w-8 rounded-full bg-green-200'></div>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent className='w-56'>
//           <DropdownMenuGroup>
//             <DropdownMenuItem
//               className='cursor-pointer'
//               onClick={() => handleLogout()}
//             >
//               Logout
//             </DropdownMenuItem>
//           </DropdownMenuGroup>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// }
