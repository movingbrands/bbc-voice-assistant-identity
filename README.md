# BBC Voice Assitant Identity guidelines

This codebase contains source code for the BBC Voice Assistant identity guidelines. It uses:

- [`react`](https://github.com/facebook/react) for components
- [`styled-components`](https://github.com/styled-components/styled-components) for styling
- [`storybook`](https://storybook.js.org/) for documentation
- `webpack` for building the library

## Sections

Each of the sections of the guidelines is defined in [/stories](./stories) as a single `*.story.js` file which are imported in specific order in the [Storybook config file](./.storybook/config.js).

### Content

Content is contained in JSON files for each story. The structure is essentially a serialized React tree with some customisation to make it fit well with Storybook. Each level usually has a `type` field in each level of the tree. the contents are then passed through the [`<ContentSerializer/>`](./.storybook/components/ContentSerializer.js) component which recursively matches the `type` to a specific component as defined in [`defaultSerializers.js`](./.storybook/components/defaultSerializers.js).

It's straightforward to create new, custom React components to accommodate new types of content or design. The [blocks](./.storybook/components/blocks/) folder contains various examples of components. [`ColourPalette.js`](./.storybook/components/blocks/ColourPalette.js) shows an example of a component that is generated from brand colour values rather than specified in a JSON data file.

Each individually story could alternatively be customised or written directly in React. Each story has a line which automatically adds Storybook sections based on the tree structure:

```js
generateStories(children, stories);
```

You could either remove this line and write the `*.story.js` file. Stories can also be added to the section normally using `stories.add()` and `storiesOf()`.

## Package scripts

### Start development mode (runs dev:\*\* scripts)

```bash
npm run dev
```

### Development mode for Storybook

```bash
npm run dev:storybook
```

## Net prototype

This repository also contains a proof of concept for the implementation of the dynamic Nets, using Javascript and GLSL shader code. The prototype uses [`phenomenon`](https://github.com/vaneenige/phenomenon) as a wrapper for WebGL.

### Outstanding areas for development

#### Resize events and regenerating the grid

#### Animating uniforms

#### Lifecycle handling for WebGL context

#### Frame counting/performance measurement

See proof-of-concept [`FrameCounter`](./src/utils/FrameCounter.js) class. This takes delta values (time elapsed between render calls), measures and summarises then, and emits events to warn the application about slow frame rate (beneath a specified threshold). Here's how we might use it.

```js
// note: this dependency not installed in package.json
import { FrameCounter } from 'Utils/FrameCounter'

const frameCounter = new FrameCounter({
  target: 60  // target frames per second
  threshold = 15 // permitted deviation from target FPS
}).on('slow-fps', (average, warningCount) => {
    // average is the framerate that we're achieving,
    // warning count is the number of times we've been warned
    console.warn(`Warning: slow framerate (${average})`)
})

...

// logic to measure delta

let oldTime = 0

// returns measured difference in milliseconds between frames
const getDelta = () => {
    const newTime = performance.now()
    const diff = (newTime - oldTime) / 1000
    oldTime = newTime

    return diff
}

// in our render loop

onRender: () => {
    frameCounter.addDelta(getDelta())
    ...
}

```

### Use with React

At its most basic level, this codebase provides a React component, `<Net/>`, that creates a canvas, creates an instance of [`netRenderer`](./src/webgl/netRenderer.js), and manages state updates between React and the WebGL context.

```jsx
import { Net } from "@movingbrands/bbc-voice-id"

...

<Net
    theme="dark"
    brand="iPlayer"
    voice="beeb"
    size={15.}
    movement={1.0}
    width={600}
    height={600}
    pixelRatio={1}
    wave={0.8}
    pulse={0.2}
  />

```

### Use in plain JS

The netRenderer is written in plain JS and can in theory be used without React. All state updates would need to be be implemented separately through the update method that the renderer exposes;

```js

import { netRenderer, Color } from "@movingbrands/bbc-voice-id"

const { renderer, update } = netRenderer({
	canvas: document.getElementById("example-canvas")
	width: 600,
	height: 600
	pixelRatio: 2,
	backgroundColor: new Color("#000000")
	foregroundColor: new Color("#FFFFFF"),
	transition: true,
	transitionRate: 0.05,
	size: 15.,
	movement: 1.0
});

...

// example of updating a uniform
update("uForegroundColor", new Color("#FF2200"));

```

### Building the library

- Using the build command will create a version of the library as exported from [./src/index.js](./src/index.js) to [./dist/index.js](./dist/index.js); this contains the core elements for rendering Nets. `react`, `react-dom`, `styled-components` and `@bbc/gel-foundations` (as used in Storybook) are all treated as external/peer dependencies and are not included in the Webpack build.

### Package scripts

#### Start development mode (runs dev:\*\* scripts)

```bash
npm run dev
```

#### Development mode for Storybook

```bash
npm run dev:storybook
```

#### Development mode for library

```bash
npm run dev:library
```

#### Linting with prettier

```bash
npm run lint
```

#### Run all build scripts concurrently

```bash
npm build
```

#### Build the library (using [webpack.build.js](./config/webpack.build.js))

```bash
npm run build:library
```

#### Export static Storybook to [storybook-static](./storybook-static)

```bash
npm run build:storybook
```

####Remove built files and folders

```bash
npm run clean
```

### Configuration

Webpack configuration files for development and build can be found in the [config][./config] folder

## Tools

### Generate stills

[generate-stills](./tools/generate-stills/index.js) is a proof of concept script that uses Puppeteer to generate still Net assets in PNG format. It uses Storybook to render the Net component in isolation using the URL query to apply parameters. This script includes a sample array of presets for export.

An example set of stills can be seen in [exports](./exports).

### Convert media

[convert-media](./tools/convert-media/index.js) is a workflow script that takes the contents of the [assets](./assets) folder and exports and optimises them using [`sharp`](https://sharp.pixelplumbing.com/) and `ffmpeg`. It searches for `mp4`, `png`, `jpg`, `svg`, `mp3` and moves them to the [static](./static) folder where the Storybook build process them will include them in the built output.
