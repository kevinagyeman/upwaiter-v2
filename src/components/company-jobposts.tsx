'use client';

import { JobPost } from '@prisma/client';

export default function CompanyJobPosts({ jobPosts }: { jobPosts: JobPost[] }) {
  console.log('company jobpost', jobPosts);

  return (
    <>
      {jobPosts?.length ? (
        jobPosts.map((job: any, index: number) => (
          <div key={index}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>numero candidature: {job.applicationsCount}</p>
            <p>lista candidati:</p>
            <ul>
              {job.applications.map((application: any, index: number) => (
                <li key={application.id}>
                  <a href={`/waiter/${application.waiterId}`}>
                    guarda il cameriere {index}
                    {/* Sostituire con il nome del cameriere se disponibile */}
                  </a>
                </li>
              ))}
            </ul>
            <a href={`../jobpost/${job.id}`}>Visualizzalo</a>
            <hr className='mb-7' />
          </div>
        ))
      ) : (
        <>Non ci sono annunci [creane uno ---- ]</>
      )}
    </>
  );
}
