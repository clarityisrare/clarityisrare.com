// The open-source toolkits promoted under /toolkit. Both ship from one public
// GitHub repo that doubles as a Claude Code / Codex plugin marketplace; each
// lives in its own folder within that repo.
//
// Naming: "The AI Requirements Toolkit" is the umbrella brand for all of them —
// the /toolkit hub. Each individual toolkit carries its own product name.

/** Umbrella brand, shown on the /toolkit hub. */
export const TOOLKIT_BRAND = 'The AI Requirements Toolkit';

export type ToolkitId = 'requirements-engineering' | 'regulatory-reporting';

export interface Toolkit {
	id: ToolkitId;
	/** Product name, used as the H1 of its own page. */
	name: string;
	/** One line of positioning — hub card, meta description, cross-links. */
	tagline: string;
	/** Who it is for, in one short phrase. */
	audience: string;
	/** Page on this site. */
	href: string;
	/** GitHub `owner/name`. */
	repo: string;
	/** Folder within the repo where this toolkit lives. */
	path: string;
	/** Plugin name, i.e. the `/plugin install <plugin>@<marketplace>` left half. */
	plugin: string;
	/** Short bullets for the hub card. */
	highlights: string[];
	/**
	 * Whether the GitHub repo is public yet. While false the live star/licence
	 * badges are hidden — shields.io renders a red "repo not found" badge for a
	 * repo that does not exist, which looks broken on an otherwise finished page.
	 * Flip to true the moment the repo is pushed.
	 */
	published: boolean;
}

export const TOOLKITS: Record<ToolkitId, Toolkit> = {
	'requirements-engineering': {
		id: 'requirements-engineering',
		name: 'Requirements Engineering Toolkit',
		tagline:
			'Turn vague business requests into clear, testable, traceable requirements — with skills that run the whole workflow for you.',
		audience: 'Requirements engineers, business analysts, product owners',
		href: '/toolkit/requirements-engineering',
		repo: 'clarityisrare/ai-requirements-toolkit',
		path: 'Toolkit_RE',
		plugin: 'requirements-toolkit',
		highlights: [
			'5 skills — elicitation, writing, review, test cases, diagrams',
			'40+ prompts, patterns, checklists, templates and Mermaid diagrams',
			'Worked before/after examples you can copy straight into your work',
		],
		published: true,
	},
	'regulatory-reporting': {
		id: 'regulatory-reporting',
		name: 'Regulatory Reporting Toolkit',
		tagline:
			'Compare Swiss and EU reporting regimes without an AI quietly inventing the answer — every statement traced to an article, every gap left visible.',
		audience: 'Compliance, regulatory reporting and RegTech teams',
		href: '/toolkit/regulatory-reporting',
		repo: 'clarityisrare/ai-requirements-toolkit',
		path: 'Toolkit_RegRep',
		plugin: 'reg-reporting-toolkit',
		highlights: [
			'6 jurisdiction-isolated experts — FMIA 39, FMIA 104, EMIR, MiFIR, MiFID II, FinSA',
			'Pinpoint citations tagged by how they were obtained',
			'Conflicts and evidence gaps survive to the executive summary',
		],
		published: true,
	},
};

/** Display order on the hub. */
export const TOOLKIT_ORDER: ToolkitId[] = [
	'requirements-engineering',
	'regulatory-reporting',
];

export const toolkitList = (): Toolkit[] => TOOLKIT_ORDER.map((id) => TOOLKITS[id]);

/** Full GitHub URL for a toolkit repo. */
export const repoURL = (t: Toolkit) => `https://github.com/${t.repo}`;

/** Deep link to a folder inside the toolkit's folder in the repo. */
export const treeURL = (t: Toolkit, folder = '') =>
	`${repoURL(t)}/tree/main/${t.path}${folder ? `/${folder}` : ''}`;

/** Deep link to a file inside the toolkit's folder in the repo. */
export const blobURL = (t: Toolkit, file: string) =>
	`${repoURL(t)}/blob/main/${t.path}/${file}`;

/**
 * Marketplace name Claude Code derives from the repo — always the repo
 * basename, e.g. `ai-requirements-toolkit`.
 */
export const marketplaceName = (t: Toolkit) => t.repo.split('/')[1];

/** One-step install for Claude Code: register the marketplace, install the plugin. */
export const claudeInstall = (t: Toolkit) => [
	`/plugin marketplace add ${t.repo}`,
	`/plugin install ${t.plugin}@${marketplaceName(t)}`,
];

/**
 * Codex resolves GitHub marketplaces through its GitHub plugin, so that has to
 * be in place first; `/reload-plugins` saves restarting the session.
 */
export const codexInstall = (t: Toolkit) => [
	`/plugin marketplace add ${t.repo}`,
	`/plugin install ${t.plugin}`,
	`/reload-plugins`,
];

/** Live shields.io badges, themed to the site accent. */
export const starBadge = (t: Toolkit) =>
	`https://img.shields.io/github/stars/${t.repo}?style=for-the-badge&logo=github&label=STARS&color=2f8f83&labelColor=1f5f57`;

export const licenseBadge = (t: Toolkit) =>
	`https://img.shields.io/github/license/${t.repo}?style=for-the-badge&label=LICENSE&color=2f8f83&labelColor=1f5f57`;
