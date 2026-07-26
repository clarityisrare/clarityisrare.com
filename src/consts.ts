// Global site data. Import from anywhere with the `import` keyword.

export const SITE_TITLE = 'Clarity Is Rare';
export const SITE_DESCRIPTION =
	'Requirements engineering notes on making requirements clear enough for people and machines.';

export const AUTHOR_NAME = 'Thinkerbell';
export const FOOTER_TAGLINE = 'Built by hand, with LLMs.';

export const SOCIAL_LINKS = {
	linkedin: 'https://www.linkedin.com/in/pamela-g-1bb53837',
	github: 'https://github.com/clarityisrare',
	bluesky: 'https://bsky.app/profile/clarityisrare.bsky.social',
	email: 'mailto:thinkerbell@clarityisrare.com',
	rss: '/rss.xml',
} as const;

// Cloudflare Web Analytics beacon token. Privacy-friendly, cookieless, free.
// Get it AFTER deploying: dash.cloudflare.com → Web Analytics → Add a site →
// enter clarityisrare.com → copy the token from the JS snippet. Paste it here.
// Empty = no analytics script is emitted (nothing ships until you set this).
export const CLOUDFLARE_ANALYTICS_TOKEN = '';
