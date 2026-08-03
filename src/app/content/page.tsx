import { Metadata } from 'next';
import FilterSidebar from '@/components/FilterSidebar';
import PageHero from '@/components/PageHero';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/cards/PostCard';
import { apiGet, emptyPage, Paginated, Post } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Content — Devstrike',
  description:
    'Blogs and news from Devstrike Digital Limited — deepening tech appreciation, one article at a time.',
};

interface Props {
  searchParams: {
    type?: string;
    category?: string;
    search?: string;
    page?: string;
  };
}

export default async function ContentPage({ searchParams }: Props) {
  const params = new URLSearchParams();
  params.set('type', searchParams.type === 'news' ? 'news' : 'blog');
  if (searchParams.category) params.set('category', searchParams.category);
  if (searchParams.search) params.set('search', searchParams.search);
  params.set('page', searchParams.page ?? '1');
  params.set('limit', '8');

  const [data, categories] = await Promise.all([
    apiGet<Paginated<Post>>(`/posts?${params}`, emptyPage<Post>()),
    apiGet<string[]>('/posts/categories', []),
  ]);

  const hrefFor = (page: number) => {
    const next = new URLSearchParams(params);
    next.set('page', String(page));
    return `/content?${next.toString()}`;
  };

  return (
    <main>
      <PageHero
        title="Content"
        subtitle="Blogs and news from the Devstrike team — deep dives, explainers, and updates from our projects."
      />

      <div className="container mx-auto flex flex-col gap-10 px-4 py-12 md:px-6 lg:flex-row lg:gap-14 lg:px-8">
        <FilterSidebar
          searchPlaceholder="Search articles"
          groups={[
            {
              title: 'Type',
              param: 'type',
              options: [
                { label: 'Blogs', value: 'blog' },
                { label: 'News', value: 'news' },
              ],
            },
            {
              title: 'Categories',
              param: 'category',
              options: [
                { label: 'All', value: 'all' },
                ...categories.map((c) => ({ label: c, value: c })),
              ],
            },
          ]}
        />

        <div className="min-w-0 flex-1">
          {data.items.length === 0 ? (
            <p className="py-16 text-center text-gray-500">
              No articles match these filters yet.
            </p>
          ) : (
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
              {data.items.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <Pagination page={data.page} pages={data.pages} hrefFor={hrefFor} />
        </div>
      </div>
    </main>
  );
}
