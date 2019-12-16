# BBC Voice Assitant Identity guidelines

This codebase contains source code for the BBC Voice Assistant identity guidelines. It uses:

- [`react`](https://github.com/facebook/react) for components
- [`styled-components`](https://github.com/styled-components/styled-components) for styling
- [`storybook`](https://storybook.js.org/) for documentation
- `webpack` for building the library

## Sections

Each of the sections of the guidelines is defined in [/stories](./stories) as a single `*.story.js` file which are imported in specific order in the [Storybook config file](./.storybook/config.js).

### Content

Content is contained in JSON files for each story. The structure is essentially a serialized React tree. Each level usually has a `type` field in each level of the tree. the contents are then passed through the [`<ContentSerializer/>`](./.storybook/components/ContentSerializer.js) component which recursively matches the `type` to a specific component as defined in [`defaultSerializers.js`](./.storybook/components/defaultSerializers.js).

It's straightforward to create new, custom React components to accommodate new types of content or design. The [blocks](./.storybook/components/blocks/) folder contains various examples of components. [`ColourPalette.js`](./.storybook/components/blocks/ColourPalette.js) shows an example of a component that is generated from brand colour values rather than specified in a JSON data file.

Each individually story could alternatively be customised or written directly in React. Each story has a line which automatically adds Storybook sections based on the tree structure:

```js
generateStories(children, stories);
```

## Package scripts

### Start development mode (runs dev:\*\* scripts)

```bash
npm run dev
```

### Development mode for Storybook

```bash
npm run dev:storybook
```
