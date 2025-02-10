'use client';

import { JobPost } from '@prisma/client';

export default function JobPosts({ jobPosts }: { jobPosts: JobPost[] }) {
  console.log('fff', jobPosts);

  return (
    <>
      {jobPosts?.length ? (
        jobPosts.map((job: JobPost, index: number) => (
          <div key={index}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <a href={`../jobpost/${job.id}`}>leggi i dettagli</a>
            <hr className='mb-7' />
          </div>
        ))
      ) : (
        <>Non ci sono annunci</>
      )}
    </>
  );
}
