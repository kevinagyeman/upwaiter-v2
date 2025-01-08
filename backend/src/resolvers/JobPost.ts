import { JobPost } from 'src/entities/JobPost';
import { MyContext } from 'src/types';
import { Resolver, Query, Ctx } from 'type-graphql';

@Resolver()
export class JobPostResolver {
  @Query(() => [JobPost])
  jobPosts(@Ctx() { em }: MyContext): Promise<JobPost[]> {
    return em.find(JobPost, {});
  }
}
