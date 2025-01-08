import { Resolver, Query, Ctx, Int, Arg } from 'type-graphql';
import { JobPost } from '../entities/JobPost';
import { MyContext } from '../types';

@Resolver()
export class JobPostResolver {
  @Query(() => [JobPost])
  jobPosts(@Ctx() { em }: MyContext): Promise<JobPost[]> {
    return em.find(JobPost, {});
  }

  @Query(() => JobPost, { nullable: true })
  jobPost(
    @Arg('id', () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<JobPost | null> {
    return em.findOne(JobPost, { id });
  }
}
