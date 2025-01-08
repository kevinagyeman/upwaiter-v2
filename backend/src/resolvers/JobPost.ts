import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
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
    @Arg('id') id: number,
    @Ctx() { em }: MyContext
  ): Promise<JobPost | null> {
    return em.findOne(JobPost, { id });
  }

  @Mutation(() => JobPost)
  async createJobPost(
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Ctx() { em }: MyContext
  ): Promise<JobPost> {
    const jobPost = em.create(JobPost, { title, description });
    await em.persistAndFlush(jobPost);
    return jobPost;
  }

  @Mutation(() => JobPost, { nullable: true })
  async updateJobPost(
    @Arg('id') id: number,
    @Arg('title', () => String, { nullable: true }) title: string,
    @Arg('description', () => String, { nullable: true }) description: string,
    @Ctx() { em }: MyContext
  ): Promise<JobPost | null> {
    const jobPost = await em.findOne(JobPost, { id });
    if (!jobPost) {
      return null;
    }
    if (title) {
      jobPost.title = title;
      await em.persistAndFlush(jobPost);
    }
    if (description) {
      jobPost.description = description;
      await em.persistAndFlush(jobPost);
    }
    return jobPost;
  }

  @Mutation(() => Boolean)
  async deleteJobPost(
    @Arg('id') id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(JobPost, { id });
    return true;
  }
}
