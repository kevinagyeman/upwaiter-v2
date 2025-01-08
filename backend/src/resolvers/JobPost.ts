import { Resolver, Query, Ctx } from 'type-graphql';
import { JobPost } from '../entities/JobPost';
import { MyContext } from '../types';

@Resolver()
export class JobPostResolver {
  @Query(() => [JobPost])
  jobPosts(@Ctx() { em }: MyContext): Promise<JobPost[]> {
    return em.find(JobPost, {});
  }
}
