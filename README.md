**Video Speed Controller** gives you fine-grained control over any HTML5 video
or audio element, on any site.

we don't read at a fixed pace, and we shouldn't watch at one either.

## Features

- **Universal** - works on any site with HTML5 media: YouTube, Netflix,
  Coursera, podcasts, local files, etc.
- **Video and audio** - controls both `<video>` and `<audio>` elements.
- **Fine-grained speed** - 0.07x to 16x in configurable increments.
- **Per-site speed rules** - set a default playback speed for specific domains
  (e.g., always 2x on lecture sites).
- **Per-site disable** - turn off the controller on sites where you don't
  want it.
- **Remember speed** - optionally persist your last speed across sessions
  and tabs.
- **Speed fightback** - automatically re-applies your chosen speed when a
  site's player tries to reset it.
- **Fully customizable shortcuts** - remap every key, add modifier combos
  (Ctrl, Shift, Alt), create multiple preferred-speed toggles.
- **Custom controller CSS** - style or reposition the overlay with your own
  CSS rules.

## Default keyboard shortcuts

- **S** - decrease playback speed
- **D** - increase playback speed
- **R** - reset playback speed to 1.0x
- **Z** - rewind video by 10 seconds
- **X** - advance video by 10 seconds
- **G** - toggle between current and preferred speed
- **V** - show/hide the controller

All shortcuts are fully customizable in the extension's settings page. You can
reassign keys, add modifier combinations, and define multiple preferred-speed
shortcuts with different values for quick toggling. Click **Add New** in
settings to create additional bindings. Refresh the page after making changes
for them to take effect.

## Build & load from source

The extension is bundled with esbuild, so you load the **build output** in
`dist/` — not the source tree or the project root.

```sh
npm install
npm run build   # outputs to dist/ (use `npm run dev` to rebuild on save)
```

- **Chrome / Brave / Chromium** — go to `chrome://extensions`, enable
  **Developer mode**, click **Load unpacked**, and select the **`dist/`** folder.
- **Firefox** — go to `about:debugging#/runtime/this-firefox`, click **Load
  Temporary Add-on…**, and select **`dist/manifest.json`**.

> Load the build output, not the project root. The root `manifest.json` points
> at built paths that only exist after `npm run build`, so loading it directly
> makes the browser report **"File not found"** (for example, on the options
> page shown via **Preferences**).

Original ## License (MIT License) - Copyright (c) 2014 Ilya Grigorik

[chrome-web-store-link]: https://chromewebstore.google.com/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk
[github-release-link]: https://github.com/igrigorik/videospeed/releases
