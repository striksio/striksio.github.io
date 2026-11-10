# striksio.me

Personal portfolio, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Add a project

1. Create `src/content/projects/<name>.md`. The file name becomes the URL: `/projects/<name>/`.
2. Fill in the frontmatter (copy an existing project as a template):
   - `title`, `summary`, `year`
   - `order`: lower numbers are listed first
   - `featured: true` for a large card with media, otherwise it becomes a small tile
   - `tags`, `metrics` (`value` + `label`), `links` (`label` + `url`)
   - `video` + `poster`, or `image`: paths to files in `public/media/`
   - `portrait: true` if the video is taller than it is wide
3. Write the project page in Markdown below the frontmatter.
4. Commit and push to `main`. The site rebuilds and deploys itself.

Convert a demo GIF to a small MP4 before adding it:

```bash
ffmpeg -i demo.gif -movflags +faststart -pix_fmt yuv420p \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -crf 26 public/media/<name>.mp4
```

## Site details

Name, intro text, email, profile links, publications and the Google Search Console verification code live in `src/site.ts`.
