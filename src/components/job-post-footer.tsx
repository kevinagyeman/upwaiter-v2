'use client';

import { LinkIcon, Send, Users } from 'lucide-react';
import { Button } from './ui/button';

type JobPostFooterProps = {
  jobPost: any;
};

export default function JobPostFooter({ jobPost }: JobPostFooterProps) {
  return (
    <div className='flex gap-x-3'>
      <div className='flex items-center gap-x-3 flex-1'>
        <Users />
        <span className='text-xl'>{jobPost.applicationsCount}</span>
      </div>
      <Button size='icon' variant={'outline'} className='rounded-full'>
        <Send />
      </Button>
      <Button size='icon' variant={'outline'} className='rounded-full'>
        <LinkIcon />
      </Button>
    </div>
  );
}
