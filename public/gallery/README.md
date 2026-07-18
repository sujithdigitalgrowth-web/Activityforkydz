# Product page gallery photos

Extra photos for the thumbnail rail on a product page, on top of its regular
cover/banner image (see `public/categories/README.md` and
`public/banners/`). Only products with a `galleryImages` entry in
`src/lib/products.ts` show this rail — everything else keeps the single
main image as before.

## Naming convention

```
public/gallery/<slug>/<name>.jpg
```

The `<name>` for each slot is whatever filename its `galleryImages` entry in
`src/lib/products.ts` points to.

Every product now has a `galleryImages` entry and a matching empty
`public/gallery/<slug>/` folder, so the gallery rail (and its uncropped
"look inside" viewer) is the standard for the whole catalog — not just the
two packs with real photos so far. Until real files land, each slot falls
back to the emoji + color placeholder (see Notes).

## Current slots

Packs with real photos uploaded:

- `animal-friends/colouring-pack.jpg` — a finished page (Duck)
- `animal-friends/sheep.jpg` — a look inside the pack (Sheep)
- `animal-friends/rabbit.jpg` — a look inside the pack (Rabbit)
- `birds-of-the-world/colouring-pack.jpg` — a finished page (Bird of Paradise)
- `birds-of-the-world/pelican.jpg` — a look inside the pack (Pelican)
- `birds-of-the-world/rainbow-lorikeet.jpg` — a look inside the pack (Rainbow Lorikeet)

Packs waiting on photos — folders exist and `products.ts` already points at
these filenames, so dropping in a same-named `.jpg` is all that's needed:

- `alphabet-adventures/{colouring-pack,look-inside-1,look-inside-2}.jpg`
- `numbers-1-to-100/{colouring-pack,look-inside-1,look-inside-2}.jpg`
- `oceans-and-sea-life/{colouring-pack,look-inside-1,look-inside-2}.jpg`
- `fruits-and-vegetables/{colouring-pack,look-inside-1,look-inside-2}.jpg`
- `trees-and-plants/{colouring-pack,look-inside-1,look-inside-2}.jpg`
- `matching-and-memory/{colouring-pack,look-inside-1,look-inside-2}.jpg`
- `puzzles-and-find-the-difference/{colouring-pack,look-inside-1,look-inside-2}.jpg`
- `dot-to-dot/{colouring-pack,look-inside-1,look-inside-2}.jpg`

Feel free to rename `look-inside-1`/`look-inside-2` to the actual subject
(e.g. `sheep.jpg`) once real content exists — just update the matching
`src` in `products.ts` to match.

## Notes

- Format must be `.jpg`. Landscape/square photos and portrait A4 "look
  inside the pack" page scans are both fine — the main viewer shows
  landscape/square cropped to fill (`object-cover`), but automatically
  switches to uncropped/letterboxed (`object-contain`) for any slide after
  the first, so a tall page never gets its top or bottom cut off.
- At least 800x600px (or the A4 equivalent, roughly 1000x1400px, for page
  scans).
- Until a file is uploaded for a slot, that thumbnail (and the main image, if
  selected) falls back to the emoji + color placeholder — nothing breaks in
  the meantime.
