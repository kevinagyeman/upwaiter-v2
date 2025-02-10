import JobPosts from '@/components/jobposts';
import PaginationElement from '@/components/pagination-element';
import { getJobPosts } from '@/services/jobpost.services';

export default async function Page({ searchParams }: any) {
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 10;
  const { jobPosts, totalPages }: any = await getJobPosts(
    currentPage,
    itemsPerPage
  );

  const paginationUrls = {
    previous: currentPage > 1 ? `?page=${currentPage - 1}` : null,
    next: currentPage < totalPages ? `?page=${currentPage + 1}` : null,
    pages: Array.from({ length: totalPages }, (_, i) => `?page=${i + 1}`),
  };

  return (
    <>
      <JobPosts jobPosts={jobPosts} />
      <PaginationElement
        currentPage={currentPage}
        totalPages={totalPages}
        paginationUrls={paginationUrls}
      />
    </>
  );
}
