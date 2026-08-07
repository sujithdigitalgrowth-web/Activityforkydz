"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductVisual({
  product,
  className = "",
  emojiClassName = "text-6xl",
  iconOnly = false,
  srcOverride,
  priority = false,
  // Default matches the original hardcoded value — grid cards and other
  // small tiles never render wider than ~400px, so this stays correct for
  // them. Full-width usages (the hero carousel) pass their own sizes,
  // since "400px" badly undersells how wide they actually render.
  sizes = "(max-width: 768px) 90vw, 400px",
}: {
  product: Product;
  className?: string;
  emojiClassName?: string;
  // Skip the real cover photo and always show the accent + emoji tile —
  // for spots like the category strip, which is meant to stay a uniform
  // row of simple icons rather than a mix of photos and icons.
  iconOnly?: boolean;
  // Use a specific image instead of the default cover (product.image /
  // /categories/<slug>.jpg) — e.g. product.bannerImage for the hero carousel.
  srcOverride?: string;
  // Only the single above-the-fold likely-LCP image on a page should set
  // this (e.g. the first hero carousel slide) — everywhere else stays lazy.
  //
  // Deliberately does NOT use next/image's own priority/preload prop.
  // ProductVisual's only priority caller (HeroCarousel) renders two DOM
  // images per slide — a mobile crop and a desktop crop — gated by a CSS
  // media query so only one is ever visible at a time. Next's own docs
  // warn against preload/priority in exactly that "multiple
  // viewport-conditional LCP candidates" situation: it forces BOTH images
  // to preload/eager-load regardless of which one CSS is hiding.
  // fetchPriority="high" instead just raises fetch urgency for whichever
  // one the browser actually requests — the default lazy +
  // IntersectionObserver loading still correctly skips the hidden one,
  // and still fires immediately since it's already in the viewport.
  priority?: boolean;
  sizes?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const src = srcOverride ?? product.image ?? `/categories/${product.slug}.jpg`;
  // Titles with long marketing taglines can push "title — tagline" past the
  // ~125 char alt-text guideline — fall back to the title alone rather than
  // truncating mid-sentence.
  const fullAlt = `${product.title} — ${product.tagline}`;
  const alt = fullAlt.length <= 125 ? fullAlt : product.title;

  // The accent + emoji fallback is always the base layer, so there's never a
  // blank flash while the real cover image is still loading (or a 404, for
  // packs that don't have one yet) — this matters most on slow mobile networks.
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${product.accent} flex items-center justify-center ${className}`}
    >
      <span className={emojiClassName}>{product.emoji}</span>
      {!iconOnly && !imageFailed && (
        <Image
          src={src}
          alt={alt}
          fill
          fetchPriority={priority ? "high" : undefined}
          sizes={sizes}
          // Priority images are the page's LCP candidate — fading them in
          // from opacity-0 only after a client `onLoad` state update fires
          // means LCP has to wait for JS hydration on top of the image
          // download, adding seconds on a throttled mobile CPU. Skip the
          // fade for priority images only; non-priority images (grid
          // cards, thumbnails) keep it since LCP never waits on those.
          className={`object-cover ${
            priority
              ? "opacity-100"
              : `transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}
