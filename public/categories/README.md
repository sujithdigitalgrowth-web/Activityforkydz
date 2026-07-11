# Category / product cover images

Drop a cover photo in this folder named after the product's `slug` (see
`src/lib/products.ts`), and it shows up automatically everywhere that
product is displayed — hero banner, category strip, product grid, product
page. No code changes needed.

## Naming convention

```
public/categories/<slug>.jpg
```

Example: the "Animal Friends Coloring & Learning Pack" product has
`slug: "animal-friends"`, so its cover image is:

```
public/categories/animal-friends.jpg
```

Current slugs (add a `.jpg` for each as you get real photos/artwork):

- animal-friends.jpg
- birds-of-the-world.jpg
- flower-garden.jpg
- numbers-1-to-100.jpg
- nature-and-seasons.jpg
- space-explorers.jpg
- hindu-festivals.jpg
- alphabet-adventures.jpg
- vehicles-and-machines.jpg
- dinosaur-discovery.jpg

## Adding a new category/product later

When you add a new product to `src/lib/products.ts`, just drop its cover
image here using the same `<slug>.jpg` naming — it will be picked up the
same way, automatically.

## Notes

- Format must be `.jpg`. (If you only have a `.png` or `.webp`, convert it
  or re-export as `.jpg` first.)
- Recommended size: at least 800x600px, 4:3 or 16:9 landscape orientation
  — the same image is reused for square thumbnails, wide banners and
  detail-page hero, all cropped via CSS `object-cover`.
- Until a file is uploaded for a slug, that product automatically falls
  back to its emoji + color placeholder — nothing breaks in the meantime.
