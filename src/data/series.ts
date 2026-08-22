import type { ImageMetadata } from 'astro';
import series01 from '../assets/images/series-01.jpg';
import series02 from '../assets/images/series-02.jpg';
import series03 from '../assets/images/series-03.jpg';
import seriesToolkits from '../assets/images/series-toolkits.jpg';

export type SeriesId = 'series-01' | 'series-02' | 'series-03' | 'toolkits';

export interface Series {
	id: SeriesId;
	num: string;
	title: string;
	image: ImageMetadata;
}

export const SERIES: Record<SeriesId, Series> = {
	'series-01': {
		id: 'series-01',
		num: '01',
		title: 'AI Does Not Fix Bad Requirements. It Scales Them.',
		image: series01,
	},
	'series-02': {
		id: 'series-02',
		num: '02',
		title: 'Why Requirements Engineering Must Change',
		image: series02,
	},
	'series-03': {
		id: 'series-03',
		num: '03',
		title: 'AI-readable documentation architecture',
		image: series03,
	},
	// Not a narrative series: the posts that introduce the open-source toolkits
	// promoted under /toolkit. Kept in the same collection so they share the blog
	// list, search and reading experience.
	toolkits: {
		id: 'toolkits',
		num: '04',
		title: 'Toolkits',
		image: seriesToolkits,
	},
};

// Canonical reading order of the series.
export const SERIES_ORDER: SeriesId[] = [
	'series-01',
	'series-02',
	'series-03',
	'toolkits',
];
