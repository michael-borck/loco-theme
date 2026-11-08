# loco-theme

Shared Starlight options, design tokens, and project navigation for LocoLabo sites.

Consumed as a git dependency:

```json
{
  "dependencies": {
    "@locolabo/theme": "github:michael-borck/loco-theme#v0.1.0"
  }
}
```

Then in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { loco } from '@locolabo/theme';

export default defineConfig({
  site: 'https://locofosil.org',
  integrations: [
    starlight(
      loco({
        project: 'loco-fosil',
        title: 'LocoFósil',
        description: 'Second-life GPUs, measured.',
        github: 'loco-fosil',
        accent: { low: '#2a1608', main: '#d97706', high: '#fcd9a8' },
        sidebar: [
          /* site-specific groups */
        ],
      })
    ),
  ],
});
```

`src/projects.json` is the single source of truth for project names, URLs, and
status. It drives the hub index and every site's Related navigation.

## Exports

| Export | Purpose |
|---|---|
| `.` | `loco()` and `relatedItems()` |
| `./custom.css` | Shared design tokens and base overrides |
| `./projects.json` | Canonical project manifest |
| `./gpus.json` | Canonical lab-wide GPU registry |

## Licence

MIT.
