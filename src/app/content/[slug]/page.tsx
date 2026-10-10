import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LuArrowLeft, LuCalendar, LuClock } from 'react-icons/lu';
import PageHero from '@/components/PageHero';
import PostCard from '@/components/cards/PostCard';
import { Paragraphs } from '@/components/ui/Content';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { apiGet, emptyPage, Paginated, Post, resolveImage } from '@/lib/api';
import { formatDate, readingTime } from '@/lib/format';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const post = await apiGet<Post | null>(`/posts/${params.slug}`, null);
  return {
    title: post ? `${post.title} — Devstrike` : 'Content — Devstrike',
    description: post?.excerpt,
    openGraph: post?.coverImage
      ? { images: [resolveImage(post.coverImage)!] }
      : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const post = await apiGet<Post | null>(`/posts/${params.slug}`, null);
  if (!post) notFound();

  const more = await apiGet<Paginated<Post>>(
    `/posts?type=${post.type}&limit=4`,
    emptyPage<Post>()
  );
  const related = more.items.filter((p) => p.id !== post.id).slice(0, 3);
  const listHref = `/content?type=${post.type}`;

  return (
    <main>
      <PageHero
        crumbs={[
          { label: 'Content', href: '/content' },
          { label: post.type === 'news' ? 'News' : 'Blogs', href: listHref },
          { label: post.title },
        ]}
        eyebrow={<span className='eyebrow-light'>{post.category}</span>}
        title={post.title}
        subtitle={post.excerpt}
      >
        <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/55'>
          <span className='flex items-center gap-2'>
            <LuCalendar className='h-4 w-4' /> {formatDate(post.createdAt)}
          </span>
          <span className='flex items-center gap-2'>
            <LuClock className='h-4 w-4' />{' '}
            {readingTime(post.body || post.excerpt)}
          </span>
        </div>
      </PageHero>

      <article className='container py-14 md:py-20'>
        <div className='mx-auto max-w-3xl'>
          {post.coverImage && (
            <Reveal className='mb-12'>
              <div className='relative aspect-[16/9] overflow-hidden rounded-3xl bg-surface shadow-lift'>
                <Image
                  src={resolveImage(post.coverImage)!}
                  alt={post.title}
                  fill
                  sizes='(max-width: 768px) 100vw, 768px'
                  className='object-cover'
                  priority
                />
              </div>
            </Reveal>
          )}

          <Reveal>
            <Paragraphs text={post.body || post.excerpt} />
          </Reveal>

          <div className='mt-12 border-t border-ink/[0.06] pt-8'>
            <Link
              href={listHref}
              className='group inline-flex items-center gap-2 text-sm font-bold text-ink/60 transition-colors hover:text-primary'
            >
              <LuArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
              Back to {post.type === 'news' ? 'news' : 'blogs'}
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className='bg-surface py-20 md:py-28'>
          <div className='container'>
            <Reveal>
              <SectionHeading
                eyebrow='Keep reading'
                title='More from the team'
              />
            </Reveal>
            <div className='mt-12 grid gap-6 md:grid-cols-3'>
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 90} className='h-full'>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
