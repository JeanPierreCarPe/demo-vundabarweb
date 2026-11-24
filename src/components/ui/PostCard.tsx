import type { Post } from '@/types';
import { cn } from '@/utils/cn';
import AppLink from './AppLink';
import ZoomImage from './ZoomImage';
import Tag from './Tag';

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** Journal card: cover, category, title, excerpt and meta. The whole card is one link. */
export default function PostCard({ post, className }: { post: Post; className?: string }) {
  return (
    <AppLink href={`/journal/${post.slug}`} className={cn('group/card flex flex-col gap-5', className)}>
      <ZoomImage src={post.cover} alt={post.coverAlt} width={800} height={533} className="aspect-[3/2] w-full" />
      <div className="flex flex-col gap-4">
        <Tag className="self-start group-hover/card:border-accent">{post.category}</Tag>
        <h3 className="font-display text-2xl font-bold leading-8 text-snow/90 transition-colors duration-300 group-hover/card:text-accent">
          {post.title}
        </h3>
        <p className="font-display text-lg font-medium text-snow/70">{post.excerpt}</p>
        <p className="font-display text-base font-semibold text-snow/60">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
        </p>
      </div>
    </AppLink>
  );
}
