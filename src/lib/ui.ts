// Class strings shared by the toolkit pages, so the four of them stay visually
// identical without copying Tailwind soup into every file.

export const H2 = 'text-[28px] font-extrabold tracking-[-0.02em] text-accent-ink';

export const BODY = 'text-[18px] leading-[1.75] text-pretty text-ink-2';

export const EYEBROW =
	'font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-accent';

export const PRIMARY_BTN =
	'inline-flex items-center gap-2.5 rounded-[20px] bg-accent px-6 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-accent-ink';

export const GHOST_BTN =
	'inline-flex items-center gap-2.5 rounded-[20px] border border-line-2 bg-white px-6 py-3 text-[16px] font-semibold text-accent-ink transition-colors hover:bg-accent-soft';

/** The reading column every toolkit page shares. */
export const COLUMN = 'mx-auto max-w-[880px] px-8 max-[760px]:px-4';
