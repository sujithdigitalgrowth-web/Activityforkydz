export type Product = {
  slug: string;
  title: string;
  // Shorter title for catalog/grid cards (aims for ~30-35 characters so it
  // fits one line on mobile). Leave unset to just show the full `title` —
  // only the packs with long titles need an override. The product page,
  // SEO title/meta, and breadcrumbs always use the full `title`/`seoTitle`.
  cardTitle?: string;
  categoryLabel: string; // short name for the category strip tile (title is too long to fit)
  // Colouring Pack vs Learning Pack — drives the storefront filter tabs and
  // the "add a learning pack" / "add a colouring pack" cross-sell prompt on
  // the cart and checkout pages.
  category: "colouring" | "learning";
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
  // Optional override for the PDF's actual filename in public/products/,
  // for packs whose file is named after the product title rather than the
  // slug (e.g. "A-Z Colouring Book.pdf"). Leave unset to use `<slug>.pdf`.
  pdfFile?: string;
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
    category: "colouring",
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
    category: "colouring",
    tagline: "One letter, one picture, one word per page from A to Z",
    price: 65,
    pageCount: 28,
    ageRange: "3-6 years",
    accent: "from-fuchsia-100 to-pink-50",
    emoji: "🔤",
    image: "/categories/Alphabet%20Adventures%20A-Z%20Pack.png",
    bannerImage: "/banners/desktop/alphabet-adventures.png",
    galleryImages: [
      { src: "/gallery/alphabet-adventures/bear.jpg", label: "A finished page — B is for Bear" },
      { src: "/gallery/alphabet-adventures/elephant.jpg", label: "A look inside the pack — E is for Elephant" },
      { src: "/gallery/alphabet-adventures/giraffe.png", label: "A look inside the pack — G is for Giraffe" },
    ],
    rating: 4.6,
    purchaseCount: 1670,
    pdfFile: "A-Z Colouring Book.pdf",
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
    category: "colouring",
    tagline: "Peacocks, parrots, owls and more, with names in English",
    price: 99,
    pageCount: 51,
    ageRange: "4-9 years",
    accent: "from-sky-100 to-blue-50",
    emoji: "🦜",
    image: "/categories/Birds%20of%20the%20World.png",
    bannerImage: "/banners/desktop/birds-of-the-world.png",
    galleryImages: [
      { src: "/gallery/birds-of-the-world/owl.jpg", label: "A look inside the pack — Owl" },
      { src: "/gallery/birds-of-the-world/parrot.jpg", label: "A look inside the pack — Parrot" },
      { src: "/gallery/birds-of-the-world/rooster.jpg", label: "A look inside the pack — Rooster" },
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
    category: "colouring",
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
    category: "colouring",
    tagline: "Dolphins, turtles, octopuses and every creature under the waves",
    price: 99,
    pageCount: 52,
    ageRange: "3-8 years",
    accent: "from-cyan-100 to-sky-50",
    emoji: "🐠",
    image: "/categories/Oceans%20and%20Sea%20Life%20Coloring.png",
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
    category: "colouring",
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
    category: "colouring",
    tagline: "Mighty trees, tiny seedlings and how a seed grows into a plant",
    price: 89,
    pageCount: 52,
    ageRange: "3-8 years",
    accent: "from-green-100 to-lime-50",
    emoji: "🌳",
    image: "/categories/Trees%20and%20Plants%20Coloring.png",
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
    category: "learning",
    tagline: "Pair the pictures, spot the match, train that memory",
    price: 99,
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
    category: "learning",
    tagline: "Spot-the-difference scenes, mazes and simple picture puzzles",
    price: 99,
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
    category: "learning",
    tagline: "Connect the numbers, connect the letters, reveal the picture",
    price: 99,
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
  {
    slug: "cursive-handwriting",
    title: "Cursive Handwriting: From First Strokes to Joined-Up Writing",
    categoryLabel: "Cursive Handwriting",
    category: "learning",
    tagline: "Warm-up strokes, all 26 letters, joining up, then real words and sentences",
    price: 99,
    pageCount: 50,
    ageRange: "3-7 years",
    accent: "from-indigo-100 to-blue-50",
    emoji: "✍️",
    galleryImages: [
      { src: "/gallery/cursive-handwriting/colouring-pack.jpg", label: "A finished page" },
      { src: "/gallery/cursive-handwriting/look-inside-1.jpg", label: "A look inside the pack" },
      { src: "/gallery/cursive-handwriting/look-inside-2.jpg", label: "A look inside the pack" },
    ],
    rating: 4.7,
    purchaseCount: 140,
    comingSoon: true,
    description:
      "A proper cursive curriculum, not just letter copying — six warm-up stroke pages first, then the alphabet, then joining letters together, then real words and sentences to write.",
    whatsInside: [
      "50 practice pages across five parts: warm-up strokes, the A-Z alphabet, joining up, words & sentences, and free practice",
      "A pink starting dot on every letter and four guide lines to keep sizing consistent",
      "A certificate of finishing at the end",
    ],
    whyItMatters: [
      "Starts with the four basic pen movements instead of forty repeats of one letter",
      "Builds joining — the part kids actually struggle with — as its own dedicated section",
      "Short, ten-minute sessions by design, since handwriting is a physical skill, not an intellectual one",
    ],
    longDescription:
      "Cursive Handwriting takes a different route than most copybooks: instead of handing a child letter A to copy forty times, it starts with six pages of pure movement — the scoop, the arch, the loop, the wave — the four shapes that make up almost every lowercase letter. From there it moves through the alphabet one letter a page, then a whole section on joining letters together, then real words: days of the week, months, numbers, colours and short sentences. A pink dot marks where to start each letter, and four guide lines give every letter somewhere to sit. Designed for children aged 3-7, this printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["letters-and-words", "alphabet-adventures"],
    seoTitle: "Cursive Handwriting Practice Pack — Printable PDF for Kids",
    seoDescription:
      "50-page printable cursive handwriting workbook for kids ages 3-7. Warm-up strokes, the alphabet, joining letters, and real words to write. Instant PDF download.",
  },
  {
    slug: "festivals-colouring",
    title: "Festivals: A Colouring Book of Celebrations from India and Around the World",
    categoryLabel: "Festivals",
    category: "colouring",
    tagline: "24 festivals of India, 20 from around the world, and 6 pages of festive patterns",
    price: 89,
    pageCount: 50,
    ageRange: "4-10 years",
    accent: "from-rose-100 to-amber-50",
    emoji: "🎉",
    galleryImages: [
      { src: "/gallery/festivals-colouring/colouring-pack.jpg", label: "A finished page" },
      { src: "/gallery/festivals-colouring/look-inside-1.jpg", label: "A look inside the pack" },
      { src: "/gallery/festivals-colouring/look-inside-2.jpg", label: "A look inside the pack" },
    ],
    rating: 4.7,
    purchaseCount: 130,
    comingSoon: true,
    description:
      "Twenty four festivals from across India sit beside twenty from the rest of the world, drawn in exactly the same style and given exactly the same space on the page — with one short line on every page about what actually happens at that festival.",
    whatsInside: [
      "50 pages to colour in three parts: festivals of India, festivals of the world, and festive patterns",
      "One short read-aloud fact per page about the festival being coloured",
      "Bold, open outlines that use very little ink and suit any coloring tool",
    ],
    whyItMatters: [
      "Shows that everybody celebrates, and that celebrating looks different everywhere",
      "No gods, prophets or saints depicted — just lamps, food, instruments and decorations, so any family can pick up a crayon without a second thought",
      "Turns coloring time into a few seconds of general knowledge, read aloud while your child colours",
    ],
    longDescription:
      "The Festivals Colouring Book brings 24 festivals from across India and 20 from around the world onto the same page in the same style — Diwali beside Christmas, Holi beside Songkran — plus six pages of festive patterns like rangoli and mehendi to finish. Every page carries one short line about what actually happens at that festival, meant to be read aloud while your child colours. Drawn deliberately without any religious figures, so any family from any background can hand a child a crayon without a second thought. Designed for children aged 4-10, this printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["animal-friends", "birds-of-the-world"],
    seoTitle: "Festivals Colouring Book — Printable PDF for Kids",
    seoDescription:
      "50-page printable colouring book of 24 Indian and 20 world festivals for kids ages 4-10, with a read-aloud fact on every page. Instant PDF download.",
  },
  {
    slug: "letters-and-words",
    title: "Letters and Words: The Big Alphabet Activity Book",
    cardTitle: "Letters & Words Activity Book",
    categoryLabel: "Letters and Words",
    category: "learning",
    tagline: "39 print-and-play worksheets across four parts, plus a full answer key",
    price: 99,
    pageCount: 54,
    ageRange: "3-6 years",
    accent: "from-teal-100 to-cyan-50",
    emoji: "🔠",
    image: "/categories/Letters%20and%20Words.png",
    bannerImage: "/banners/desktop/Letters%20and%20Words.png",
    galleryImages: [
      {
        src: "/gallery/letters-and-words/Screenshot%202026-07-26%20083209.jpg",
        label: "What's inside — the full contents page",
      },
      {
        src: "/gallery/letters-and-words/Screenshot%202026-07-26%20083244.jpg",
        label: "A look inside the pack — Which Letter Comes Next?",
      },
      {
        src: "/gallery/letters-and-words/Screenshot%202026-07-26%20083310.jpg",
        label: "A look inside the pack — Letter Hunt",
      },
    ],
    rating: 4.6,
    purchaseCount: 150,
    pdfFile: "Letters and Words.pdf",
    description:
      "Thirty-nine worksheets that get gently harder as they go — letter recognition first, then short words, then first sounds, then practice and play — built around the moment a child notices the letter they just traced is the same one that starts their own name.",
    whatsInside: [
      "54 pages total: 39 worksheets across four parts (meet the alphabet, letters & words, sounds & missing letters, and practice & play)",
      "A full answer key at the back",
      "A certificate of finishing",
    ],
    whyItMatters: [
      "Builds the letter-shape-sound connection through noticing, not just repetition",
      "One sheet a day is plenty — about six calm weeks of ten-minute sessions",
      "Ends with 'My Name in Letters' and 'Draw It Yourself' so the alphabet feels personal",
    ],
    longDescription:
      "Letters and Words is 39 printable worksheets that move through four parts and get gently harder as they go: meeting the alphabet through tracing, putting letters into short words, finding first sounds, and finally practice-and-play pages like letter hunts and colour-by-letter. A full answer key and a certificate of finishing round it out. Designed for children aged 3-6, one sheet a day is plenty — about six calm weeks of ten-minute sessions by the end of which a child knows every letter by sight. This printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["alphabet-adventures", "numbers-and-counting-mats"],
    seoTitle: "Letters and Words: The Big Alphabet Activity Book — Printable PDF for Kids",
    seoDescription:
      "54-page printable alphabet activity book for kids ages 3-6, with 39 worksheets and a full answer key. Letter recognition, short words and first sounds. Instant PDF download.",
  },
  {
    slug: "numbers-and-counting-mats",
    title: "Numbers and Counting: Number Tracing and Counting Mats",
    cardTitle: "Numbers & Counting Mats",
    categoryLabel: "Numbers & Counting",
    category: "learning",
    tagline: "21 counting mats and 19 worksheets covering 0 to 20, ten frames and first sums",
    price: 99,
    pageCount: 56,
    ageRange: "3-6 years",
    accent: "from-violet-100 to-purple-50",
    emoji: "🧮",
    image: "/categories/Numbers%20and%20Counting.png",
    bannerImage: "/banners/desktop/Numbers%20%26%20Counting.png",
    galleryImages: [
      {
        src: "/gallery/numbers-and-counting-mats/Screenshot%202026-07-26%20114102.jpg",
        label: "A look inside the pack — Sums Without Pictures",
      },
      {
        src: "/gallery/numbers-and-counting-mats/Screenshot%202026-07-26%20114136.jpg",
        label: "A look inside the pack — All Three Together (skip counting)",
      },
      {
        src: "/gallery/numbers-and-counting-mats/Screenshot%202026-07-26%20114201.jpg",
        label: "The full answer key",
      },
    ],
    rating: 4.7,
    purchaseCount: 160,
    pdfFile: "Numbers and Counting.pdf",
    description:
      "Every number from 0 to 20 gets a full page, shown four ways at once — as a numeral to trace, as a word, as counters in a ten frame, and as a place on the number line — so a quantity finally means something, not just something to recite.",
    whatsInside: [
      "21 number mats (0-20) plus 19 worksheets: counting & ten frames, first sums, and skip counting",
      "A full answer key at the back",
      "A certificate of finishing",
    ],
    whyItMatters: [
      "Teaches counting, not just reciting — a child touches and matches a quantity, not just chants numbers",
      "Slips into a plastic sleeve for reuse with a dry-wipe pen",
      "Builds toward real sums and skip counting once the mats are done",
    ],
    longDescription:
      "Numbers and Counting is 21 number tracing mats covering 0 to 20, followed by 19 worksheets on counting, ten frames, first sums and skip counting. Each mat shows one quantity four different ways — a numeral to trace, a word, counters in a ten frame, and a spot on the number line — so a number finally means something. A full answer key and a certificate of finishing are included. Designed for children aged 3-6, slip a mat into a plastic sleeve with a dry-wipe pen to reuse it all week. This printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["numbers-1-to-100", "letters-and-words"],
    seoTitle: "Numbers and Counting: Tracing and Counting Mats — Printable PDF for Kids",
    seoDescription:
      "56-page printable number tracing and counting mats for kids ages 3-6, covering 0-20 with ten frames, first sums and skip counting. Instant PDF download.",
  },
  {
    slug: "abc-of-character",
    title: "ABC of Character",
    categoryLabel: "ABC of Character",
    category: "learning",
    tagline: "One letter, one good value, from A to Z",
    price: 99,
    pageCount: 28,
    ageRange: "3-6 years",
    accent: "from-amber-100 to-yellow-50",
    emoji: "🌟",
    image: "/categories/ABC%20Character.png",
    bannerImage: "/banners/desktop/ABC%20Character.png",
    galleryImages: [
      {
        src: "/gallery/abc-of-character/Screenshot%202026-07-26%20114304.jpg",
        label: "A look inside the pack — C is for Caring",
      },
      {
        src: "/gallery/abc-of-character/Screenshot%202026-07-26%20114328.jpg",
        label: "A look inside the pack — F is for Friendly",
      },
      {
        src: "/gallery/abc-of-character/Screenshot%202026-07-26%20114354.jpg",
        label: "A look inside the pack — J is for Joyful",
      },
    ],
    rating: 4.5,
    purchaseCount: 80,
    pdfFile: "ABC of Character.pdf",
    description:
      "An A-Z pack pairing each letter with a value or character trait — for kids old enough to color independently and start talking about kindness, honesty and the like.",
    whatsInside: [
      "28 pages: one letter, one value, one picture per page from A to Z",
      "Large, simple outlines for independent coloring",
    ],
    whyItMatters: [
      "Turns everyday coloring time into short chats about values",
      "Pairs letters with ideas kids can actually act on, not just objects",
    ],
    relatedSlugs: ["alphabet-adventures", "letters-and-words"],
    seoTitle: "ABC of Character — Printable PDF for Kids",
    seoDescription:
      "28-page printable A-Z coloring pack for kids ages 3-6, pairing each letter with a value. Instant PDF download.",
  },
  {
    slug: "atoz-activity",
    title: "My First Alphabet Activity Book",
    categoryLabel: "My First Alphabet",
    category: "learning",
    tagline: "54 activities to learn, trace, find, match and colour from A to Z",
    price: 99,
    pageCount: 54,
    ageRange: "2-5 years",
    accent: "from-lime-100 to-green-50",
    emoji: "🔡",
    image: "/categories/Alphabet%20Activity%20Book.png",
    bannerImage: "/banners/desktop/Alphabet%20Activity%20Book.png",
    galleryImages: [
      {
        src: "/gallery/Alphabet%20Activity%20Book/ChatGPT%20Image%20Jul%2026%2C%202026%2C%2007_53_43%20AM.png",
        label: "A colour preview — Letter F activities",
      },
      {
        src: "/gallery/Alphabet%20Activity%20Book/Screenshot%202026-07-26%20071200.jpg",
        label: "A look inside the pack — Letter D activities",
      },
      {
        src: "/gallery/Alphabet%20Activity%20Book/Screenshot%202026-07-26%20071227.jpg",
        label: "A look inside the pack — Letter E tracing",
      },
    ],
    rating: 4.5,
    purchaseCount: 80,
    pdfFile: "First Alphabet Activity Book.pdf",
    description:
      "A gentle first alphabet book for the youngest learners — every letter from A to Z gets its own match-circle-maze-colour activity page plus a trace-and-find page, built for a toddler just starting to notice that letters mean something.",
    whatsInside: [
      "54 activity pages: one match/circle/maze/colour activity page and one trace-and-find page for every letter, A to Z",
      "Uppercase and lowercase letters, letter sounds, picture matching, mazes and colouring",
    ],
    whyItMatters: [
      "Eases in gently for ages 2-5, a step before the more advanced Letters and Words pack",
      "Builds early literacy skills through play, not repetition",
      "Doubles as easy parent-child bonding time, not just solo screen-free practice",
    ],
    relatedSlugs: ["letters-and-words", "alphabet-adventures"],
    seoTitle: "My First Alphabet Activity Book — Printable PDF for Kids",
    seoDescription:
      "54-page printable A-Z activity book for kids ages 2-5. Letter recognition, tracing, matching and colouring. Instant PDF download.",
  },
  {
    slug: "my-first-lines",
    title: "My First Lines: A Pre-Writing Tracing Workbook",
    cardTitle: "My First Lines: Tracing Workbook",
    categoryLabel: "My First Lines",
    category: "learning",
    tagline: "Fun line-tracing activities — dashes, waves, zigzags, loops and swirls",
    price: 79,
    pageCount: 27,
    ageRange: "2-5 years",
    accent: "from-blue-100 to-cyan-50",
    emoji: "〰️",
    image: "/categories/My%20First%20Lines.png",
    bannerImage: "/banners/desktop/My%20First%20Lines.png",
    galleryImages: [
      {
        src: "/gallery/my-first-lines/Screenshot%202026-07-26%20080932.jpg",
        label: "A look inside the pack — Butterfly's Flight Path (wave & zigzag tracing)",
      },
      {
        src: "/gallery/my-first-lines/Screenshot%202026-07-26%20080857.jpg",
        label: "A look inside the pack — Fish Makes Bubbles (spiral tracing)",
      },
      {
        src: "/gallery/my-first-lines/Screenshot%202026-07-26%20081002.jpg",
        label: "A look inside the pack — Bunny's Loopy Ears (loop tracing)",
      },
    ],
    rating: 4.5,
    purchaseCount: 80,
    pdfFile: "My First Lines.pdf",
    description:
      "A pre-writing workbook built entirely around one skill: pencil control. Simple dashed lines, waves, zigzags, loops and swirls, sized for the very first time a toddler picks up a crayon.",
    whatsInside: [
      "27 pages of line, curve and pattern tracing practice",
      "Sized for a toddler's early pencil grip",
    ],
    whyItMatters: [
      "Improves pencil control and builds fine motor skills before letters are introduced",
      "Enhances focus and concentration in short, achievable bursts",
      "Boosts early writing readiness and confidence — trace today, write tomorrow",
    ],
    relatedSlugs: ["alphabet-adventures", "cursive-handwriting"],
    seoTitle: "My First Lines: Pre-Writing Tracing Workbook — Printable PDF for Kids",
    seoDescription:
      "27-page printable pre-writing workbook for kids ages 2-5, with line, curve and pattern tracing practice. Instant PDF download.",
  },
  {
    slug: "flowers-colouring",
    title: "Flowers Colouring Book: 104 Flowers from India and Around the World",
    cardTitle: "Flowers Colouring Book (104 Designs)",
    categoryLabel: "Flowers",
    category: "colouring",
    tagline: "104 flowers to colour, each with its real colours shown and a fun fact",
    price: 109,
    pageCount: 121,
    ageRange: "5-12 years",
    accent: "from-pink-100 to-rose-50",
    emoji: "🌸",
    image: "/categories/Flowers%20Colouring.png",
    bannerImage: "/banners/desktop/Flowers%20Colouring.png",
    galleryImages: [
      {
        src: "/gallery/Flower%20Coloring%20Book/Screenshot%202026-07-26%20171953.jpg",
        label: "A look inside the pack — Hollyhock",
      },
      {
        src: "/gallery/Flower%20Coloring%20Book/Screenshot%202026-07-26%20172022.jpg",
        label: "A look inside the pack — Kadamba",
      },
      {
        src: "/gallery/Flower%20Coloring%20Book/Screenshot%202026-07-26%20171857.jpg",
        label: "The full contents page",
      },
    ],
    rating: 4.7,
    purchaseCount: 90,
    pdfFile: "Flowers Coloring Book.pdf",
    description:
      "A proper botanical colouring book, not just flower shapes — 104 flowers from India and around the world, each page showing the common name, local name, and Latin name, plus a small real-colours reference so there's a correct answer to aim for.",
    whatsInside: [
      "121 pages covering 104 flowers, organised into sections: Flowers of India, Wild and Rare Flowers of India, Flowers of Europe, Flowers of Asia, and Flowers of the Americas",
      "Every page shows the flower's common name, local name (where it has one), and botanical Latin name, alongside a black-and-white outline to colour",
      "A small 'real colours' reference thumbnail and a one-line fun fact on every page",
    ],
    whyItMatters: [
      "Turns colouring time into a real introduction to botany — common name, local name and Latin name, all on one page",
      "The real-colours reference means there's no wrong way to colour, but also a correct one to notice and aim for",
      "104 flowers is enough to fill weeks of colouring without ever repeating a page",
    ],
    longDescription:
      "The Flowers Colouring Book is a 121-page printable collection of 104 flowers, moving from familiar garden flowers in India through wild and rare Indian species, then on to flowers of Europe, Asia and the Americas. Every single page follows the same clear format: a clean black-and-white outline to colour, the flower's common name, its local name where it has one, its botanical Latin name, a small 'real colours' reference thumbnail, and a short one-line fact underneath. It's designed for children aged 5-12 who are ready for something more detailed than a basic colouring pack — patient enough to notice petal counts and leaf shapes, curious enough to enjoy learning a flower's real name while they colour it in. This printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["trees-and-plants", "alphabet-adventures"],
    seoTitle: "Flowers Colouring Book — 104 Printable Flowers for Kids (PDF)",
    seoDescription:
      "121-page printable flowers colouring book with 104 flowers from India and around the world. Common, local and botanical names plus a real-colours reference on every page. Instant PDF download.",
  },
  {
    slug: "time-patterns-and-shapes",
    title: "Telling Time, Patterns and Shapes: A 100-Page Activity Workbook",
    cardTitle: "Time, Patterns & Shapes Workbook",
    categoryLabel: "Time, Patterns & Shapes",
    category: "learning",
    tagline: "20 clock worksheets, 15 pattern pages, shape activities and crosswords, plus a full answer key",
    price: 159,
    pageCount: 100,
    ageRange: "5-9 years",
    accent: "from-blue-100 to-indigo-50",
    emoji: "🕐",
    image: "/categories/Time%20Patterns%20and%20Shapes.png",
    bannerImage: "/banners/desktop/Time%20Patterns%20and%20Shapes.png",
    galleryImages: [
      {
        src: "/gallery/Timing%20and%20Shapes/Screenshot%202026-07-26%20171637.jpg",
        label: "A look inside the pack — Minutes Past and Minutes To",
      },
      {
        src: "/gallery/Timing%20and%20Shapes/Screenshot%202026-07-26%20171443.jpg",
        label: "A look inside the pack — Solids to Know",
      },
      {
        src: "/gallery/Timing%20and%20Shapes/Screenshot%202026-07-26%20171553.jpg",
        label: "A look inside the pack — Faces, Edges and Corners",
      },
    ],
    rating: 4.6,
    purchaseCount: 70,
    pdfFile: "TIme Pattern and Shapes Learning.pdf",
    description:
      "A 100-page workbook covering three skills kids genuinely need repeated practice with — telling the time, spotting patterns, and naming flat and solid shapes — with crosswords mixed in so it never feels like a stack of worksheets.",
    whatsInside: [
      "20 clock worksheets: o'clock, half past, and minutes past/to, building up gradually",
      "15 pattern pages plus flat and solid shape activities (faces, edges and corners)",
      "8 crosswords and a full answer key at the back",
    ],
    whyItMatters: [
      "Telling time needs real repeated practice, not just recognition — this covers o'clock through to minutes past/to in order",
      "Solid shapes get proper attention here (faces, edges, corners), which most workbooks skip entirely",
      "Crosswords fold vocabulary revision into the maths, breaking up the worksheet routine",
    ],
    longDescription:
      "Telling Time, Patterns and Shapes is a 100-page printable workbook built around three skills that take real, repeated practice to stick: reading a clock, spotting what comes next in a pattern, and naming flat and solid shapes by their faces, edges and corners. It starts with simple o'clock times and works up gradually to minutes past and minutes to, covers AB patterns and beyond, walks through solid shapes like cubes, cuboids, spheres, prisms, cones and cylinders, and rounds it all off with 8 crosswords that fold vocabulary revision into the maths without it feeling like more worksheets. A full answer key is included at the back. Designed for children aged 5-9, this printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["numbers-and-counting-mats", "numbers-1-to-100"],
    seoTitle: "Telling Time, Patterns and Shapes Workbook — Printable PDF for Kids",
    seoDescription:
      "100-page printable workbook for kids ages 5-9 — 20 clock worksheets, patterns, flat and solid shapes, and crosswords, with a full answer key. Instant PDF download.",
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
