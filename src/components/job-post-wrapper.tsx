import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
};

const JobPostWrapper = ({ children }: WrapperProps) => {
  return (
    <div className='h-full flex flex-col gap-y-4 p-4 bg-gradient-to-b dark:from-black dark:to-gray-950 from-white to-gray-100 rounded-2xl border'>
      {children}
    </div>
  );
};

export default JobPostWrapper;
