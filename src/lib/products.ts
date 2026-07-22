export type Product = {
  slug: string;
  title: string;
  categoryLabel: string; // short name for the category strip tile (title is too long to fit)
  tagline: string;
  price: number; // INR, whole rupees
  pageCount: number;
  ageRange: string;
  accent: string; // tailwind color pair for the card
  emoji: string;
  // Optional override for the cover image path. Leave unset — ProductVisual
  // automatically looks for /public/categories/<slug>.jpg and falls back to
  // the emoji + gradient below if that file doesn't exist yet. See
  // public/categories/README.md.
  image?: string;
  // Wide banner image, used by the homepage hero carousel and the product
  // detail page's main image. Leave unset — both fall back to the regular
  // cover image (`image` above / public/categories/<slug>.jpg) when there's
  // no dedicated banner. This is the desktop/tablet crop (16:9 ratio,
  // ~1672x941px) — drop new ones in public/banners/desktop/<slug>.<ext>.
  bannerImage?: string;
  // Optional separate mobile crop for the hero carousel, in case mobile
  // ever needs a different crop than desktop again. Leave unset to just
  // reuse `bannerImage` on mobile too (current default — both breakpoints
  // are 16:9 right now). Drop new ones in public/banners/mobile/<slug>.<ext>.
  bannerImageMobile?: string;
  // Extra photos for the product page's thumbnail rail (shown to the left of
  // the main image), on top of the cover/banner above. Leave unset — the
  // product page then shows just the single main image with no thumbnail
  // rail, same as before. Drop files in public/gallery/<slug>/<name>.jpg;
  // until a file exists, that slot falls back to the emoji + color
  // placeholder, same as the cover image does.
  galleryImages?: { src: string; label: string }[];
  rating: number; // out of 5. Placeholder for now — replace with real average once you have reviews.
  purchaseCount: number; // placeholder for now — replace with real order counts once you have them
  comingSoon?: boolean; // true until the real PDF is uploaded to public/products/<slug>.pdf
  description: string;
  whatsInside: string[];
  whyItMatters: string[];
  // Extended SEO body copy for the product page, shown below the fold
  // content and above the FAQ. Leave unset until a pack's copy is finalized
  // — do not fabricate this for packs that don't have it yet.
  longDescription?: string;
  // Slugs of thematically related packs to show in "You might also like".
  // Coming-soon targets are filtered out automatically at render time, so
  // this can be set ahead of a pack going live.
  relatedSlugs?: string[];
  // Overrides for the page <title> (without the " | activityforKydz" suffix
  // — the root layout's title template adds that) and meta description.
  // Falls back to the generated title/description in generateMetadata when
  // unset.
  seoTitle?: string;
  seoDescription?: string;
};

export const products: Product[] = [
  {
    slug: "animal-friends",
    title: "Animal Friends Coloring & Learning Pack",
    categoryLabel: "Animal Friends",
    tagline: "52 pages of lions, pandas, elephants and every animal kids ask about",
    price: 99,
    pageCount: 52,
    ageRange: "3-8 years",
    accent: "from-amber-100 to-orange-50",
    emoji: "🦁",
    bannerImage: "/banners/desktop/animal-friends.png",
    galleryImages: [
      { src: "/gallery/animal-friends/colouring-pack.jpg", label: "A finished page — Duck" },
      { src: "/gallery/animal-friends/sheep.jpg", label: "A look inside the pack — Sheep" },
      { src: "/gallery/animal-friends/rabbit.jpg", label: "A look inside the pack — Rabbit" },
    ],
    rating: 4.8,
    purchaseCount: 3240,
    description:
      "A big, friendly collection of animals from the jungle, the farm, the ocean and the sky — each one drawn simply enough for small hands to color in, with a fun fact underneath to read together.",
    whatsInside: [
      "52 pages covering 50+ animals across land, sea and sky",
      "Simple, bold outlines sized for crayons and thick pencils",
      "One fun animal fact per page for read-aloud time",
      "A 4-page 'spot the animal' game at the end",
    ],
    whyItMatters: [
      "Builds fine motor control through coloring within lines",
      "Introduces animal names and habitats in a low-pressure way",
      "Gives you a ready answer for 'I'm bored' without opening a screen",
    ],
    longDescription:
      "Give your child a screen-free adventure with the Animal Friends Coloring & Learning Pack — 52 printable pages featuring lions, elephants, pandas, and every animal kids love to ask about. Each page pairs a simple, bold illustration with the animal's name in English, making it a gentle way to build vocabulary while having fun with crayons. Perfect for toddlers and early learners aged 3–8, this printable animal coloring pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Parents love that it keeps kids engaged for hours without a screen in sight. Whether it's a quiet afternoon at home or a long car ride, these 52 animal coloring pages for kids turn learning into playtime. Download once, print as many times as you like.",
    relatedSlugs: ["birds-of-the-world", "oceans-and-sea-life"],
    seoTitle: "Animal Friends Coloring & Learning Pack — Printable PDF for Kids",
    seoDescription:
      "52 printable animal coloring pages for kids ages 3-8. Instant PDF download, print at home. Lions, elephants, pandas and more.",
  },
  {
    slug: "alphabet-adventures",
    title: "Alphabet Adventures A-Z Pack",
    categoryLabel: "Alphabet A-Z",
    tagline: "One letter, one picture, one word per page from A to Z",
    price: 65,
    pageCount: 28,
    ageRange: "3-6 years",
    accent: "from-fuchsia-100 to-pink-50",
    emoji: "🔤",
    bannerImage: "/banners/desktop/alphabet-adventures.png",
    galleryImages: [
      { src: "/gallery/alphabet-adventures/bear.jpg", label: "A finished page — B is for Bear" },
      { src: "/gallery/alphabet-adventures/elephant.jpg", label: "A look inside the pack — E is for Elephant" },
      { src: "/gallery/alphabet-adventures/giraffe.png", label: "A look inside the pack — G is for Giraffe" },
    ],
    rating: 4.6,
    purchaseCount: 1670,
    description:
      "A clean, simple A-Z pack pairing each letter with a picture and word — for kids just starting to connect letters to sounds.",
    whatsInside: [
      "28 pages: a big traceable letter with a picture and word per page",
      "One 'find the letter' spotting game every 5 letters",
      "Large print sized for early pencil grip",
    ],
    whyItMatters: [
      "Builds the letter-sound-picture connection early readers need",
      "Short enough to do one letter a day without it feeling like homework",
      "Good first step before proper handwriting practice",
    ],
    longDescription:
      "One letter, one picture, one word — this 28-page alphabet coloring pack takes kids on a simple, screen-free journey from A to Z. Designed for toddlers and early learners aged 3–6, each page pairs a big, friendly letter with an easy illustration and word, helping build early reading skills while your child colors. This printable alphabet worksheet pack is a favorite for parents looking for a gentle introduction to letters before kindergarten, or extra practice alongside preschool. Delivered instantly as a PDF straight to your email, there's no app to install — just print at home or at any print shop and start the alphabet adventure. A lovely first step into reading, one letter at a time.",
    relatedSlugs: ["numbers-1-to-100", "dot-to-dot"],
    seoTitle: "Alphabet Adventures A-Z Pack — Printable Alphabet Coloring for Kids",
    seoDescription:
      "28-page printable alphabet coloring pack for kids ages 3-6. One letter, one picture, one word. Instant PDF download.",
  },
  {
    slug: "birds-of-the-world",
    title: "Birds of the World Coloring Pack",
    categoryLabel: "Birds of the World",
    tagline: "Peacocks, parrots, owls and more, with names in English",
    price: 99,
    pageCount: 51,
    ageRange: "4-9 years",
    accent: "from-sky-100 to-blue-50",
    emoji: "🦜",
    bannerImage: "/banners/desktop/birds-of-the-world.png",
    galleryImages: [
      { src: "/gallery/birds-of-the-world/colouring-pack.jpg", label: "A finished page — Bird of Paradise" },
      { src: "/gallery/birds-of-the-world/pelican.jpg", label: "A look inside the pack — Pelican" },
      { src: "/gallery/birds-of-the-world/rainbow-lorikeet.jpg", label: "A look inside the pack — Rainbow Lorikeet" },
    ],
    rating: 4.6,
    purchaseCount: 1460,
    description:
      "A quieter, prettier pack for kids who love birds — peacocks in full feather, tiny sparrows, owls at night — good for a calm afternoon at the table.",
    whatsInside: [
      "51 pages featuring 40+ birds from around the world",
      "Large single-bird pages plus a few 'birds in a garden' scenes",
      "Bird name labels in simple English for early readers",
    ],
    whyItMatters: [
      "Encourages patience and attention to detail",
      "A gentle way to talk about nature and different habitats",
      "Great for kids who find animal packs 'too busy'",
    ],
    longDescription:
      "Give your child a calm, screen-free way to spend an afternoon with the Birds of the World Coloring Pack — 51 printable pages featuring peacocks, parrots, owls, sparrows and dozens more birds from around the world. Each page pairs a large, detailed illustration with the bird's name in simple English, helping kids build vocabulary while they color. Designed for children aged 4–9, this printable bird coloring pack rewards patience and attention to detail — a nice change of pace from busier, faster activities. It's instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["animal-friends", "oceans-and-sea-life"],
    seoTitle: "Birds of the World Coloring Pack — Printable PDF for Kids",
    seoDescription:
      "51-page printable bird coloring pack for kids ages 4-9. Peacocks, parrots, owls and more, with English name labels. Instant PDF download.",
  },
  {
    slug: "numbers-1-to-100",
    title: "Numbers 1-100 Practice & Coloring Pack",
    categoryLabel: "Numbers 1-100",
    tagline: "Trace, count and color your way from 1 to 100",
    price: 89,
    pageCount: 110,
    ageRange: "4-7 years",
    accent: "from-emerald-100 to-teal-50",
    emoji: "🔢",
    galleryImages: [
      { src: "/gallery/numbers-1-to-100/colouring-pack.jpg", label: "A finished page" },
      { src: "/gallery/numbers-1-to-100/look-inside-1.jpg", label: "A look inside the pack" },
      { src: "/gallery/numbers-1-to-100/look-inside-2.jpg", label: "A look inside the pack" },
    ],
    rating: 4.9,
    purchaseCount: 3680,
    comingSoon: true,
    description:
      "A proper practice workbook, not just a coloring pack — tracing pages for each number, count-and-color pages, and simple addition using pictures.",
    whatsInside: [
      "110 pages: numbers 1-100 tracing, count-and-color, and picture addition",
      "Dotted-line numbers sized for early pencil grip",
      "A printable progress chart to stick on the fridge",
    ],
    whyItMatters: [
      "Builds number recognition and pencil control together",
      "Structured enough to use daily, 1-2 pages at a time",
      "Something concrete you can point to as 'progress'",
    ],
    longDescription:
      "The Numbers 1-100 Practice & Coloring Pack is a proper practice workbook, not just a coloring pack — 110 printable pages that take kids from tracing single digits to counting, coloring and simple picture addition, all the way up to 100. Designed for children aged 4–7, each page is sized for early pencil grip, with a printable progress chart included so kids — and parents — can see how far they've come. It's instant-download only: no app, no login, just a PDF you can print at home or at any print shop, one or two pages at a time. Download once, print as many times as you like.",
    relatedSlugs: ["alphabet-adventures", "dot-to-dot"],
    seoTitle: "Numbers 1-100 Practice & Coloring Pack — Printable PDF for Kids",
    seoDescription:
      "110-page printable numbers 1-100 workbook for kids ages 4-7. Tracing, count-and-color and picture addition. Instant PDF download.",
  },
  {
    slug: "oceans-and-sea-life",
    title: "Oceans & Sea Life Coloring Pack",
    categoryLabel: "Oceans & Sea Life",
    tagline: "Dolphins, turtles, octopuses and every creature under the waves",
    price: 99,
    pageCount: 52,
    ageRange: "3-8 years",
    accent: "from-cyan-100 to-sky-50",
    emoji: "🐠",
    bannerImage: "/banners/desktop/oceans-and-sea-life.png",
    galleryImages: [
      { src: "/gallery/oceans-and-sea-life/lobster.jpg", label: "A finished page — Lobster" },
      { src: "/gallery/oceans-and-sea-life/dolphin.jpg", label: "A look inside the pack — Dolphin" },
      { src: "/gallery/oceans-and-sea-life/butterfly-fish.jpg", label: "A look inside the pack — Butterfly Fish" },
    ],
    rating: 4.7,
    purchaseCount: 1380,
    description:
      "A splashy pack of ocean life — dolphins leaping, turtles gliding, octopuses hiding among the coral — for kids who love anything that lives underwater.",
    whatsInside: [
      "52 pages covering 30+ sea creatures, from clownfish to whales",
      "A two-page coral reef scene to color as one big picture",
      "Sea creature name labels in simple English",
    ],
    whyItMatters: [
      "Introduces ocean habitats and wildlife in a gentle, visual way",
      "A calm activity that pairs well with an aquarium visit or a beach trip",
      "Great for kids who already love water and swimming",
    ],
    longDescription:
      "Dive into the Oceans & Sea Life Coloring Pack — 52 printable pages of dolphins, turtles, octopuses, clownfish and dozens more creatures that live under the waves, plus a two-page coral reef scene to color as one big picture. Each creature is paired with its name in simple English, making it an easy way to build ocean vocabulary while coloring. Designed for children aged 3–8, this printable sea life coloring pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. It's a natural pairing with an aquarium visit, a beach trip, or a rainy afternoon at the table. Download once, print as many times as you like.",
    relatedSlugs: ["animal-friends", "trees-and-plants"],
    seoTitle: "Oceans & Sea Life Coloring Pack — Printable PDF for Kids",
    seoDescription:
      "52-page printable ocean animals coloring pack for kids ages 3-8. Dolphins, turtles, octopuses and more, with name labels. Instant PDF download.",
  },
  {
    slug: "fruits-and-vegetables",
    title: "Fruits Coloring & Learning Pack",
    categoryLabel: "Fruits",
    tagline: "Apples, mangoes, bananas and more, with names to match",
    price: 70,
    pageCount: 51,
    ageRange: "3-7 years",
    accent: "from-orange-100 to-yellow-50",
    emoji: "🍎",
    bannerImage: "/banners/desktop/fruits-and-vegetables.png",
    galleryImages: [
      { src: "/gallery/fruits-and-vegetables/colouring-pack.jpg", label: "A finished page — Raspberry" },
      { src: "/gallery/fruits-and-vegetables/pineapple.jpg", label: "A look inside the pack — Pineapple" },
      { src: "/gallery/fruits-and-vegetables/grapes.jpg", label: "A look inside the pack — Grapes" },
    ],
    rating: 4.6,
    purchaseCount: 990,
    description:
      "A bright, everyday pack built around fruits kids already see at home — good for coloring time that turns into a chat about healthy snacks.",
    whatsInside: [
      "51 pages of fruits from apples to dragon fruit, plus a 'fill your fruit basket' scene",
      "A simple 'match the fruit to its tree' activity page",
      "Names in simple English under every picture",
    ],
    whyItMatters: [
      "Builds early vocabulary around fruits kids already eat",
      "An easy, low-pressure way to talk about healthy snacking",
      "Pairs naturally with a trip to the kitchen or the market",
    ],
    longDescription:
      "The Fruits Coloring & Learning Pack brings 51 printable pages of the fruits kids already see every day — apples, mangoes, bananas, strawberries and more — plus a 'fill your fruit basket' scene and a simple matching activity. Each picture is labeled in simple English, turning coloring time into an easy vocabulary lesson. Designed for children aged 3–7, this printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. It's a gentle, low-pressure way to start conversations about healthy snacking. Download once, print as many times as you like.",
    relatedSlugs: ["trees-and-plants", "matching-and-memory"],
    seoTitle: "Fruits Coloring & Learning Pack — Printable PDF for Kids",
    seoDescription:
      "51-page printable fruits coloring pack for kids ages 3-7. Learn fruit names while coloring. Instant PDF download.",
  },
  {
    slug: "trees-and-plants",
    title: "Trees & Plants Coloring & Learning Pack",
    categoryLabel: "Trees and Plants",
    tagline: "Mighty trees, tiny seedlings and how a seed grows into a plant",
    price: 75,
    pageCount: 52,
    ageRange: "3-8 years",
    accent: "from-green-100 to-lime-50",
    emoji: "🌳",
    bannerImage: "/banners/desktop/trees-and-plants.png",
    galleryImages: [
      { src: "/gallery/trees-and-plants/lotus.jpg", label: "A finished page — Lotus" },
      { src: "/gallery/trees-and-plants/apple-tree.jpg", label: "A look inside the pack — Apple Tree" },
      { src: "/gallery/trees-and-plants/coconut-tree.jpg", label: "A look inside the pack — Coconut Tree" },
    ],
    rating: 4.5,
    purchaseCount: 860,
    description:
      "A calm, green pack of trees and plants, with a simple sequence showing how a tiny seed grows into a tall tree — good for pairing with an actual walk outside.",
    whatsInside: [
      "52 pages of trees, leaves, seeds and potted plants",
      "A 4-page 'life of a tree' sequence to color in order",
      "Plant names in simple English",
    ],
    whyItMatters: [
      "Introduces early science ideas like growth and roots",
      "A quiet, low-stimulation activity good for winding down",
      "Gives you an easy reason to point things out on a walk together",
    ],
    longDescription:
      "The Trees & Plants Coloring & Learning Pack is a calm, green collection of 52 printable pages — mighty trees, tiny seedlings, leaves and potted plants — plus a 4-page sequence showing how a tiny seed grows into a tall tree. Designed for children aged 3–8, it's a quiet, low-stimulation activity that pairs naturally with an actual walk outside, giving you an easy reason to point things out along the way. This printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["fruits-and-vegetables", "oceans-and-sea-life"],
    seoTitle: "Trees & Plants Coloring & Learning Pack — Printable PDF for Kids",
    seoDescription:
      "52-page printable trees and plants coloring pack for kids ages 3-8, with a seed-to-tree growth sequence. Instant PDF download.",
  },
  {
    slug: "matching-and-memory",
    title: "Matching & Memory Activity Pack",
    categoryLabel: "Matching & Memory",
    tagline: "Pair the pictures, spot the match, train that memory",
    price: 69,
    pageCount: 40,
    ageRange: "3-6 years",
    accent: "from-purple-100 to-violet-50",
    emoji: "🧠",
    galleryImages: [
      { src: "/gallery/matching-and-memory/colouring-pack.jpg", label: "A finished page" },
      { src: "/gallery/matching-and-memory/look-inside-1.jpg", label: "A look inside the pack" },
      { src: "/gallery/matching-and-memory/look-inside-2.jpg", label: "A look inside the pack" },
    ],
    rating: 4.6,
    purchaseCount: 720,
    comingSoon: true,
    description:
      "A pack of cut-and-play matching pairs plus print-and-play memory grids — the kind of quiet, focused activity that keeps little hands busy without a screen.",
    whatsInside: [
      "40 pages of matching pairs and memory grids, easy to hard",
      "Cut-out cards for a proper table memory game",
      "Simple 'which one is different' warm-up pages",
    ],
    whyItMatters: [
      "Builds concentration and short-term memory through play",
      "Easy to play together as a family, not just solo coloring",
      "Reusable — laminate the cards and play again and again",
    ],
    longDescription:
      "The Matching & Memory Activity Pack is 40 printable pages of cut-and-play matching pairs and print-and-play memory grids, ranging from easy to a bit more challenging. Designed for children aged 3–6, it builds concentration and short-term memory through play — and unlike a coloring page, it's reusable: laminate the cards and play again and again, alone or as a family. This printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["puzzles-and-find-the-difference", "dot-to-dot"],
    seoTitle: "Matching & Memory Activity Pack — Printable PDF for Kids",
    seoDescription:
      "40-page printable matching pairs and memory game pack for kids ages 3-6. Cut-out cards, print-and-play grids. Instant PDF download.",
  },
  {
    slug: "puzzles-and-find-the-difference",
    title: "Puzzles & Find the Difference Activity Pack",
    categoryLabel: "Puzzles & Find the Difference",
    tagline: "Spot-the-difference scenes, mazes and simple picture puzzles",
    price: 69,
    pageCount: 45,
    ageRange: "4-9 years",
    accent: "from-slate-100 to-zinc-50",
    emoji: "🧩",
    galleryImages: [
      { src: "/gallery/puzzles-and-find-the-difference/colouring-pack.jpg", label: "A finished page" },
      { src: "/gallery/puzzles-and-find-the-difference/look-inside-1.jpg", label: "A look inside the pack" },
      { src: "/gallery/puzzles-and-find-the-difference/look-inside-2.jpg", label: "A look inside the pack" },
    ],
    rating: 4.7,
    purchaseCount: 940,
    comingSoon: true,
    description:
      "A pack built for kids who like to look closely — spot-the-difference scenes, simple mazes and picture puzzles that reward patience over speed.",
    whatsInside: [
      "45 pages of spot-the-difference, mazes and picture puzzles",
      "An answer key at the back for quick checking",
      "Difficulty ramps up gently from page to page",
    ],
    whyItMatters: [
      "Builds visual attention and patience in a fun, low-pressure way",
      "Great for waiting rooms, car rides and quiet afternoons",
      "Gives kids a real sense of 'I solved it' without a screen",
    ],
    longDescription:
      "The Puzzles & Find the Difference Activity Pack is 45 printable pages built for kids who like to look closely — spot-the-difference scenes, simple mazes and picture puzzles that reward patience over speed, with an answer key at the back for quick checking. Designed for children aged 4–9, the difficulty ramps up gently from page to page, making it a reliable go-to for waiting rooms, car rides and quiet afternoons. This printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["matching-and-memory", "dot-to-dot"],
    seoTitle: "Puzzles & Find the Difference Activity Pack — Printable PDF for Kids",
    seoDescription:
      "45-page printable spot-the-difference, maze and puzzle pack for kids ages 4-9. Instant PDF download, print at home.",
  },
  {
    slug: "dot-to-dot",
    title: "Dot to Dot: Connect the Numbers & Letters Pack",
    categoryLabel: "Dot to Dot",
    tagline: "Connect the numbers, connect the letters, reveal the picture",
    price: 69,
    pageCount: 50,
    ageRange: "4-9 years",
    accent: "from-red-100 to-rose-50",
    emoji: "✏️",
    galleryImages: [
      { src: "/gallery/dot-to-dot/colouring-pack.jpg", label: "A finished page" },
      { src: "/gallery/dot-to-dot/look-inside-1.jpg", label: "A look inside the pack" },
      { src: "/gallery/dot-to-dot/look-inside-2.jpg", label: "A look inside the pack" },
    ],
    rating: 4.7,
    purchaseCount: 1050,
    comingSoon: true,
    description:
      "Classic dot-to-dot, done two ways — number sequences and A-Z letter sequences — so kids practice counting and the alphabet while a picture reveals itself.",
    whatsInside: [
      "50 pages split between number dot-to-dots and letter dot-to-dots",
      "A gentle difficulty curve, from 1-20 dots up to 1-100",
      "A blank coloring step once the picture is revealed",
    ],
    whyItMatters: [
      "Reinforces number and letter order in a genuinely fun way",
      "Builds pencil control and left-to-right tracking",
      "The 'reveal' moment keeps kids motivated to finish the page",
    ],
    longDescription:
      "Dot to Dot: Connect the Numbers & Letters is 50 printable pages of classic dot-to-dot puzzles, done two ways — number sequences and A-Z letter sequences — so kids practice counting and the alphabet while a picture reveals itself underneath. Designed for children aged 4–9, the difficulty ramps up gently from 1-20 dots up to 1-100, with a blank coloring step once each picture is complete. This printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["numbers-1-to-100", "alphabet-adventures"],
    seoTitle: "Dot to Dot: Connect the Numbers & Letters — Printable PDF for Kids",
    seoDescription:
      "50-page printable dot-to-dot pack for kids ages 4-9, connecting numbers and letters to reveal a picture. Instant PDF download.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBestSellers(count = 3): Product[] {
  return [...products]
    .filter((p) => !p.comingSoon)
    .sort((a, b) => b.purchaseCount - a.purchaseCount)
    .slice(0, count);
}
