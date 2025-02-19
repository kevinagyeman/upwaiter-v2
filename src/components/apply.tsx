'use client';

import { createApplication } from '@/services/application-service';
import { useStackApp } from '@stackframe/stack';
import React from 'react';

export default function Apply({
  waiterId,
  jobPostId,
}: {
  waiterId: string;
  jobPostId: string;
}) {
  return (
    <button onClick={async () => await createApplication(waiterId, jobPostId)}>
      candidati
    </button>
  );
}
