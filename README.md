# Table of Contents

- [Overview](#overview 'Go to overview')
- [Useful scripts](#useful-scripts 'Go to useful-scripts')
- [Special Thanks](#spacial-thanks 'Go to spacial-thanks')

# [Overview](#overview 'Go to overview')

This is a tailwindcss typescript nextjs template that aims to facilitate your life as a developer. Comes up with a few but handy scripts and conventions, like the followings:

- Automatic creation for storybook stories
- Usage of atomic folders to keep your code base as clean as possible
- Pre-commit and pre-push hooks. Breaking production is no longer a concern!
- Formatter and linter.

# [Useful scripts](#useful-scripts 'Go to useful-scripts')

## npm run component

### Command

```sh
npm run component [component-name] [folder]
```

### Description

Creates a `.tsx`, `.stories.tsx` and `index.ts` (export file) files with the provided `component-name` inside the specified `folder`
/home/juli03/work/nextjs-site-template/scripts

### Why should I use it?

- Automatically creates the component story.
- Since the component is exported on the `index.ts`, find the new component is fairly easy (you just need to search the `component-name`).
- Helps keeping order in the codebase.

## npm run icons

### Command

```sh
npm run icons [icon-name]
```

### Description

Creates a SVG `.tsx` file with the provided `icon-name` and the prefix `Icon`. Don't forget to add the content of the file inside of it

### Why should I use it?

- Automatically adds all SVG types to the component.
- The prefix `Icon` allows you to effortlessly identify if the component is a SVG.
- Using `.tsx` file allows the usage of [react's lifecycle](https://reactjs.org/docs/state-and-lifecycle.html).

# [Special Thanks](#special-thanks 'Go to spacial-thanks')

These guys also contributed to make this system possible:

- [@juanpasolano](https://github.com/juanpasolano)
- [@nerami](https://github.com/nerami)
- [@sergioegb](https://github.com/sergioegb)
