import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { Post, resolveImage } from '@/lib/api';
import { formatDate, readingTime } from '@/lib/format';

const PostCard: React.FC<{ post: Post; featured?: boolean }> = ({
  post,
  featured = false,
}) => (
  <Link
    href={`/content/${post.slug}`}
    className={`card card-hover group flex h-full overflow-hidden ${
      featured ? 'flex-col md:flex-row' : 'flex-col'
    }`}
  >
    <div
      className={`relative overflow-hidden bg-surface ${
        featured ? 'aspect-[16/10] md:aspect-auto md:w-[55%]' : 'aspect-[16/10]'
      }`}
    >
      {post.coverImage ? (
        <Image
          src={resolveImage(post.coverImage)!}
          alt={post.title}
          fill
          sizes={
            featured
              ? '(max-width: 768px) 100vw, 520px'
              : '(max-width: 768px) 100vw, 400px'
          }
          priority={featured}
          className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
        />
      ) : (
        <div className='absolute inset-0 bg-brand-gradient-d' />
      )}
      <span className='absolute left-4 top-4 rounded-full bg-black/30 px-3 py-1 text-xs font-bold text-white ring-1 ring-inset ring-white/20 backdrop-blur-md'>
        {post.category}
      </span>
    </div>

    <div className={`flex flex-1 flex-col ${featured ? 'p-7 md:p-9' : 'p-6'}`}>
      <p className='text-xs font-semibold text-ink/45'>
        {formatDate(post.createdAt)} · {readingTime(post.body || post.excerpt)}
      </p>
      <h3
        className={`mt-2 font-extrabold leading-snug text-ink transition-colors group-hover:text-primary ${
          featured ? 'text-2xl md:text-3xl' : 'text-lg'
        }`}
      >
        {post.title}
      </h3>
      <p
        className={`mb-5 mt-2 leading-relaxed text-ink/60 ${
          featured ? 'line-clamp-4 text-base' : 'line-clamp-2 text-[15px]'
        }`}
      >
        {post.excerpt}
      </p>
      <span className='mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-ink/70 transition-colors group-hover:text-primary'>
        Read article
        <LuArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
      </span>
    </div>
  </Link>
);

export default PostCard;
