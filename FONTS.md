# Adding Font Files

To complete the font setup, you need to add the actual font files to the `src/fonts/` directory:

## Required Font Files

Place these files in `src/fonts/`:

### Bread Display Fonts

- `PogacaDisplayBlack.woff2` (weight: 900)
- `PogacaDisplayBold.woff2` (weight: 700)
- `PogacaDisplayRegular.woff2` (weight: 400)

### Bread Body Fonts

- `PogacaBodyRegular.woff2` (weight: 400)
- `PogacaBodyBold.woff2` (weight: 700)

## Directory Structure

```
src/fonts/
├── fonts.css
├── PogacaDisplayBlack.woff2
├── PogacaDisplayBold.woff2
├── PogacaDisplayRegular.woff2
├── PogacaBodyRegular.woff2
└── PogacaBodyBold.woff2
```

## How It Works

1. The `fonts.css` file defines `@font-face` declarations
2. Font files are bundled with your package
3. Consumers get fonts automatically when they import your theme
4. No additional setup required for consumers

## Alternative: CDN Hosting

If you prefer to host fonts externally, you can:

1. Upload fonts to a CDN (AWS S3, Cloudflare, etc.)
2. Update the `src` URLs in `fonts.css` to point to your CDN
3. Example: `src: url('https://cdn.yourdomain.com/fonts/PogacaDisplayBlack.woff2')`

This approach gives you more control over font delivery and caching.
