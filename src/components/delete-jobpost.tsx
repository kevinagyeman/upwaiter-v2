'use client';

import { createApplication } from '@/services/application.services';
import { deleteJobPost } from '@/services/jobpost.services';
import { useStackApp } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function DeleteJobPost({
  companyId,
  jobPostId,
}: {
  companyId: string;
  jobPostId: string;
}) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await deleteJobPost(jobPostId, companyId);
        router.push('/company/my-jobposts');
      }}
    >
      CANCELLA L'ANNUNCIO
    </button>
  );
}
