import { Metadata } from 'next';
import FilterSidebar from '@/components/FilterSidebar';
import PageHero from '@/components/PageHero';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/cards/PostCard';
import { EmptyState, HeroTabs } from '@/components/ui/Content';
import Reveal from '@/components/ui/Reveal';
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
  const type = searchParams.type === 'news' ? 'news' : 'blog';
  const params = new URLSearchParams();
  params.set('type', type);
  if (searchParams.category && searchParams.category !== 'all')
    params.set('category', searchParams.category);
  if (searchParams.search) params.set('search', searchParams.search);
  params.set('page', searchParams.page ?? '1');
  params.set('limit', '7');

  const [data, categories, blogs, news] = await Promise.all([
    apiGet<Paginated<Post>>(`/posts?${params}`, emptyPage<Post>()),
    apiGet<string[]>('/posts/categories', []),
    apiGet<Paginated<Post>>('/posts?type=blog&limit=1', emptyPage<Post>()),
    apiGet<Paginated<Post>>('/posts?type=news&limit=1', emptyPage<Post>()),
  ]);

  const hrefFor = (page: number) => {
    const next = new URLSearchParams(params);
    next.set('page', String(page));
    next.delete('limit');
    return `/content?${next.toString()}#results`;
  };

  const unfiltered =
    !searchParams.search &&
    (!searchParams.category || searchParams.category === 'all');
  const showFeatured = data.page === 1 && unfiltered && data.items.length > 2;
  const featured = showFeatured ? data.items[0] : undefined;
  const rest = showFeatured ? data.items.slice(1) : data.items;
  // An odd count would leave a hole in the two-column grid, so widen the last card.
  const wideLast = rest.length % 2 === 1;

  return (
    <main>
      <PageHero
        eyebrow={<span className='eyebrow-light'>Content</span>}
        title={
          <>
            Insights, explainers{' '}
            <span className='text-gradient-light'>&amp; news.</span>
          </>
        }
        subtitle='Deep dives and updates from the Devstrike team — making technology easier to understand and appreciate.'
      >
        <HeroTabs
          tabs={[
            {
              label: 'Blogs',
              href: '/content?type=blog',
              active: type === 'blog',
              count: blogs.total,
            },
            {
              label: 'News',
              href: '/content?type=news',
              active: type === 'news',
              count: news.total,
            },
          ]}
        />
      </PageHero>

      <section
        id='results'
        className='container flex scroll-mt-24 flex-col gap-10 py-14 md:py-20 lg:flex-row lg:gap-12'
      >
        <FilterSidebar
          searchPlaceholder='Search articles'
          resetParams={['page']}
          groups={[
            {
              title: 'Category',
              param: 'category',
              options: [
                { label: 'All topics', value: 'all' },
                ...categories.map((c) => ({ label: c, value: c })),
              ],
            },
          ]}
        />

        <div className='min-w-0 flex-1'>
          {data.items.length === 0 ? (
            <EmptyState
              title='No articles found'
              description='Nothing matches these filters yet — try another topic.'
              resetHref={`/content?type=${type}`}
            />
          ) : (
            <div className='grid gap-6 md:grid-cols-2'>
              {featured && (
                <Reveal className='md:col-span-2'>
                  <PostCard post={featured} featured />
                </Reveal>
              )}
              {rest.map((post, i) => {
                const wide = wideLast && i === rest.length - 1;
                return (
                  <Reveal
                    key={post.id}
                    delay={(i % 2) * 90}
                    className={wide ? 'md:col-span-2' : 'h-full'}
                  >
                    <PostCard post={post} featured={wide} />
                  </Reveal>
                );
              })}
            </div>
          )}

          <Pagination page={data.page} pages={data.pages} hrefFor={hrefFor} />
        </div>
      </section>
    </main>
  );
}
