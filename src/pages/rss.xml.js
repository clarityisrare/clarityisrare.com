import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getPublishedPosts } from '../lib/posts';

export async function GET(context) {
	const posts = await getPublishedPosts();
	const items = posts
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: post.data.tags,
			link: `/blog/${post.id}/`,
		}));

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
		customData: '<language>en-us</language>',
	});
}
