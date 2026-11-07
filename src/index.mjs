/**
 * Shared Starlight options for LocoLabo project sites.
 *
 * Usage in a site's astro.config.mjs:
 *
 *   import { defineConfig } from 'astro/config';
 *   import starlight from '@astrojs/starlight';
 *   import { loco } from '@locolabo/theme';
 *
 *   export default defineConfig({
 *     site: 'https://locofosil.org',
 *     integrations: [starlight(loco({ project: 'loco-fosil', ... }))],
 *   });
 */

import { readFileSync } from 'node:fs';

const projects = JSON.parse(
  readFileSync(new URL('./projects.json', import.meta.url), 'utf8')
);

export const LABO = 'https://locolabo.org';
export const HUB_INDEX = `${LABO}/projects/`;

/** Related navigation items for a project, excluding the project itself. */
export function relatedItems(project) {
  return [
    { label: 'All Projects', link: HUB_INDEX },
    ...projects
      .filter((p) => p.id !== project)
      .map((p) => ({ label: p.name, link: p.url })),
  ];
}

function accentStyle(accent) {
  if (!accent) return undefined;
  const low = accent.low ?? accent.main;
  const high = accent.high ?? accent.main;
  return `:root{--sl-color-accent-low:${low};--sl-color-accent:${accent.main};--sl-color-accent-high:${high}}`;
}

/**
 * Build the Starlight integration options shared by every LocoLabo site.
 *
 * @param {object} options
 * @param {string} options.project        Manifest id, e.g. "loco-fosil". Excluded from Related.
 * @param {string} options.title
 * @param {string} options.description
 * @param {string} [options.home]          Canonical URL, used for the Home social link.
 * @param {string} [options.favicon]
 * @param {object} [options.logo]         Starlight logo config.
 * @param {string} [options.github]       Repo name under michael-borck, e.g. "loco-fosil".
 * @param {object} [options.accent]       { low, main, high } hex values.
 * @param {Array}  [options.sidebar]      Project-specific sidebar groups.
 * @param {Array}  [options.head]         Extra head entries.
 * @param {Array}  [options.customCss]    Extra CSS paths.
 * @param {Array}  [options.social]       Extra social links.
 * @param {boolean}[options.labo]         Include the LocoLabo social link. Default true.
 * @param {boolean}[options.related]      Append the generated Related group. Default true.
 */
export function loco({
  project,
  title,
  description,
  home,
  favicon = '/favicon.svg',
  logo,
  github,
  accent,
  sidebar = [],
  head = [],
  customCss = [],
  social = [],
  labo = true,
  related = true,
}) {
  const style = accentStyle(accent);

  const socialLinks = [
    ...(home ? [{ icon: 'external', label: 'Home', href: home }] : []),
    ...(labo ? [{ icon: 'external', label: 'LocoLabo', href: LABO }] : []),
    ...(github
      ? [{ icon: 'github', label: 'GitHub', href: `https://github.com/michael-borck/${github}` }]
      : []),
    ...social,
  ];

  return {
    title,
    description,
    favicon,
    disable404Route: true,
    ...(logo ? { logo } : {}),
    social: socialLinks,
    customCss: ['@locolabo/theme/custom.css', ...customCss],
    head: [...(style ? [{ tag: 'style', content: style }] : []), ...head],
    sidebar: [
      ...sidebar,
      ...(related ? [{ label: 'LocoLabo Projects', items: relatedItems(project) }] : []),
    ],
  };
}
