# 🥾 boot

> boot presets the configuration needed to rapidly build static websites backed by webpack.


## Installation

While boot is designed as a template. You can __[start a new project](https://github.com/convoyinteractive/boot/generate)__ directly from GitHub.

Now you can install the required dependencies, such as *webpack*, *babel* and *sass* by running `npm install`.


## Getting started

boot ships with presets for bundling JavaScript, precompiling SASS and PostCss plugins like autoprefixer. You may want to update the configurations in the *webpack.config.js* file or require other third party dependencies.

Begin by running

```bash
npm run serve
```

By default your project will be running at http://localhost:3000 and webpack will watching your files for updates. For developer happiness 'hot module replacement' will be also enabled.

### Routing

We natively support pretty URLs. So a *news.html* file within your views directory will be accessible as *http://example.com/news/*.

To create nested pages simply divide your segments by a ":".

>Eg. `news:convoy-interactive-presents-boot.html` → `/news/convoy-interactive-presents-boot`

### Components

You may include partials within in your HTML views for a more convinient development workflow:

```js
${require('./partials/header.htm')}
```

## Assets

Currently supported file types:
- .png
- .jpg
- .jpeg
- .gif
- .svg
- .webm
- .mov
- .mp4
- .eot
- .ttf
- .woff
- .woff2

### Loading assets from HTML or CSS

Within your `HTML` or `CSS` files all images you reference relative to your current directory should be automatically loaded and versioned. 

```html
<img src="../assets/images/example.png" alt="Example Image">
```

You may require video files directly from your `HTML` via JavaScript Templates:

```html
<video src="${require('../assets/videos/video.mp4')}" controls muted />
```

### Loading assets from JavaScript

Within JavaScript files you may load your assets with `const example = require('../assets/images/example.png')`.

## Building for production

By building for production all files will be compiled down in a */dist* directory that you can upload to your production server. Your assets will be minified and versioned in a */dist/{js, css, images, videos, fonts}* directory.

```bash
npm run build
```

🎈
