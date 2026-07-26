import { getCollection, type CollectionEntry } from 'astro:content';
import { SERIES, SERIES_ORDER, type Series, type SeriesId } from '../data/series';

export type Post = CollectionEntry<'blog'>;

/** A post with its resolved series and presentation helpers. */
export interface ResolvedPost {
	post: Post;
	slug: string;
	href: string;
	series: Series;
	minutesText: string;
}

export interface SeriesGroup {
	series: Series;
	posts: ResolvedPost[];
}

/** Published posts (drafts hidden in production builds). */
export async function getPublishedPosts(): Promise<Post[]> {
	return getCollection('blog', ({ data }) =>
		import.meta.env.PROD ? !data.draft : true,
	);
}

export function resolvePost(post: Post): ResolvedPost {
	return {
		post,
		slug: post.id,
		href: `/blog/${post.id}/`,
		series: SERIES[post.data.series as SeriesId],
		minutesText: post.data.minutes ? `${post.data.minutes} min read` : '',
	};
}

/** Compare posts in canonical reading order: by series, then `order`. */
function byReadingOrder(a: Post, b: Post): number {
	const s =
		SERIES_ORDER.indexOf(a.data.series as SeriesId) -
		SERIES_ORDER.indexOf(b.data.series as SeriesId);
	return s !== 0 ? s : a.data.order - b.data.order;
}

/** All published posts in canonical reading order. */
export async function getReadingOrderPosts(): Promise<ResolvedPost[]> {
	const posts = await getPublishedPosts();
	return posts.sort(byReadingOrder).map(resolvePost);
}

/** The first `count` posts in reading order — the home "Recent posts" grid. */
export async function getRecentPosts(count = 4): Promise<ResolvedPost[]> {
	return (await getReadingOrderPosts()).slice(0, count);
}

/**
 * Plain-text body of a post (subtitle + body) with MDX/markdown syntax stripped,
 * for the client-side full-text search index. Not perfect prose — good enough to
 * match words against and to slice a readable snippet from.
 */
export function postBodyText(post: Post): string {
	const raw = post.body ?? '';
	const body = raw
		.replace(/^import\s.*$/gm, '') // import statements
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> label text
		.replace(/<[^>]+>/g, ' ') // JSX/HTML tags (keep children)
		.replace(/^\s{0,3}#{1,6}\s+/gm, '') // heading markers
		.replace(/^\s*[-*+]\s+/gm, '') // bullet markers
		.replace(/^\s*\d+\.\s+/gm, '') // ordered-list markers
		.replace(/[*_`~>]/g, ' ') // emphasis / code / quote chars
		.replace(/\s+/g, ' ')
		.trim();
	return [post.data.subtitle, body].filter(Boolean).join('. ');
}

/** Published posts grouped by series, in canonical order (empty groups dropped). */
export async function getSeriesGroups(): Promise<SeriesGroup[]> {
	const resolved = await getReadingOrderPosts();
	return SERIES_ORDER.map((id) => ({
		series: SERIES[id],
		posts: resolved.filter((r) => r.post.data.series === id),
	})).filter((g) => g.posts.length > 0);
}
