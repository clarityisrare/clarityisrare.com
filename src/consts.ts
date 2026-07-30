// Global site data. Import from anywhere with the `import` keyword.

export const SITE_TITLE = 'Clarity Is Rare';
export const SITE_DESCRIPTION =
	'Requirements engineering notes on making requirements clear enough for people and machines.';

export const AUTHOR_NAME = 'Thinkerbell';
export const FOOTER_TAGLINE = 'Built by hand, with LLMs.';

// The open-source companion toolkit (separate GitHub repo). Used by /toolkit.
export const TOOLKIT_REPO = 'clarityisrare/ai-requirements-toolkit';
export const TOOLKIT_URL = `https://github.com/${TOOLKIT_REPO}`;

// Temporary "coming soon" takeover. When true, only the landing (`/`) and the
// About page are real: the landing shows the coming-soon page, every other
// route shows it too (via the 404), and the header nav shrinks to Home + About.
// The rest of the site (blog, posts, search) stays in the codebase, just hidden.
// Flip to `false` to launch the full site — nothing else needs changing.
export const COMING_SOON_MODE = true;

export const SOCIAL_LINKS = {
	linkedin: 'https://www.linkedin.com/in/pamelaglas',
	github: 'https://github.com/clarityisrare',
	bluesky: 'https://bsky.app/profile/clarityisrare.com',
	email: 'mailto:thinkerbell@clarityisrare.com',
	rss: '/rss.xml',
} as const;

// Cloudflare Web Analytics beacon token. Privacy-friendly, cookieless, free.
// Get it AFTER deploying: dash.cloudflare.com → Web Analytics → Add a site →
// enter clarityisrare.com → copy the token from the JS snippet. Paste it here.
// Empty = no analytics script is emitted (nothing ships until you set this).
export const CLOUDFLARE_ANALYTICS_TOKEN = '';
