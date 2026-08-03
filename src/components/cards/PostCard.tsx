import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Post, resolveImage } from '@/lib/api';

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <Link href={`/content/${post.slug}`} className="group block">
    <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100 md:h-56">
      {post.coverImage && (
        <Image
          src={resolveImage(post.coverImage)!}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      )}
    </div>
    <p className="mt-3 text-sm font-medium text-primary">{post.category}</p>
    <h3 className="mt-1 text-lg font-bold text-gray-900 group-hover:text-primary">
      {post.title}
    </h3>
    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
  </Link>
);

export default PostCard;
