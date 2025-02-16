import { JobPost } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
type JobPostCardProps = {
  jobPost: JobPost;
};

export default function JobPostCard({ jobPost }: JobPostCardProps) {
  return (
    <div className='p-4 h-[calc(100dvh-4rem)]'>
      <Card className='h-full'>
        <CardHeader>
          <CardTitle>{jobPost.title}</CardTitle>
          <CardDescription>{jobPost.description}</CardDescription>
        </CardHeader>
        {/* <CardContent>jijojoj</CardContent> */}
        <CardFooter className='flex justify-between'>
          {/* <Button variant='outline'>Cancel</Button> */}
          <Button asChild size='sm'>
            <Link href={`../jobpost/${jobPost.id}`}>Leggi i dettagli</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
