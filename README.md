This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Overview

# Table of Content

# Getting Started

# [Useful scripts](#useful-scripts 'Go to useful-scripts')

## npm run component

### Command

```sh
npm run component [component-name] [folder]
```

### Description

Creates a `.tsx`, `.stories.tsx` and `index.ts` (export file) files with the provided `component-name` inside the specified `folder`

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
