import Image from 'next/image';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import PageHero from '@/components/PageHero';
import { apiGet, Post, resolveImage } from '@/lib/api';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const post = await apiGet<Post | null>(`/posts/${params.slug}`, null);
  return {
    title: post ? `${post.title} — Devstrike` : 'Content — Devstrike',
    description: post?.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const post = await apiGet<Post | null>(`/posts/${params.slug}`, null);
  if (!post) notFound();

  const date = new Date(post.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main>
      <PageHero
        title="Content"
        subtitle="Blogs and news from the Devstrike team."
      />
      <Breadcrumb
        items={[
          { label: post.type === 'news' ? 'News' : 'Blogs', href: '/content' },
          { label: post.title },
        ]}
      />

      <article className="container mx-auto px-4 pb-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {post.coverImage && (
            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl bg-gray-100 md:h-96">
              <Image
                src={resolveImage(post.coverImage)!}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <p className="text-sm font-medium text-primary">{post.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-gray-400">{date}</p>

          <div className="mt-8">
            {post.body
              .split('\n')
              .filter(Boolean)
              .map((para, i) => (
                <p key={i} className="mb-5 leading-relaxed text-gray-600">
                  {para}
                </p>
              ))}
          </div>
        </div>
      </article>
    </main>
  );
}
