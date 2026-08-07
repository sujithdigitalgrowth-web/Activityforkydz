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
  // Overrides for the page <title> and meta description, rendered exactly
  // as written — no brand suffix is appended (per SEO pack: product titles
  // stay unbranded to save title-tag space). Falls back to the generated
  // title/description in generateMetadata when unset.
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
      { src: "/gallery/animal-friends/colouring-pack.jpg", label: "Printable duck colouring page" },
      { src: "/gallery/animal-friends/sheep.jpg", label: "Printable sheep colouring page" },
      { src: "/gallery/animal-friends/rabbit.jpg", label: "Printable rabbit colouring page" },
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
      { src: "/gallery/alphabet-adventures/bear.jpg", label: "Letter B tracing page — B is for Bear" },
      { src: "/gallery/alphabet-adventures/elephant.jpg", label: "Letter E tracing page — E is for Elephant" },
      { src: "/gallery/alphabet-adventures/giraffe.png", label: "Letter G tracing page — G is for Giraffe" },
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
    relatedSlugs: [],
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
      { src: "/gallery/birds-of-the-world/owl.jpg", label: "Printable owl colouring page" },
      { src: "/gallery/birds-of-the-world/parrot.jpg", label: "Printable parrot colouring page" },
      { src: "/gallery/birds-of-the-world/rooster.jpg", label: "Printable rooster colouring page" },
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
      { src: "/gallery/oceans-and-sea-life/lobster.jpg", label: "Printable lobster colouring page" },
      { src: "/gallery/oceans-and-sea-life/dolphin.jpg", label: "Printable dolphin colouring page" },
      { src: "/gallery/oceans-and-sea-life/butterfly-fish.jpg", label: "Printable butterfly fish colouring page" },
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
      { src: "/gallery/fruits-and-vegetables/colouring-pack.jpg", label: "Printable raspberry colouring page" },
      { src: "/gallery/fruits-and-vegetables/pineapple.jpg", label: "Printable pineapple colouring page" },
      { src: "/gallery/fruits-and-vegetables/grapes.jpg", label: "Printable grapes colouring page" },
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
    relatedSlugs: ["trees-and-plants"],
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
      { src: "/gallery/trees-and-plants/lotus.jpg", label: "Printable lotus colouring page" },
      { src: "/gallery/trees-and-plants/apple-tree.jpg", label: "Printable apple tree colouring page" },
      { src: "/gallery/trees-and-plants/coconut-tree.jpg", label: "Printable coconut tree colouring page" },
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
        label: "Contents page listing all worksheets in the Letters and Words activity book",
      },
      {
        src: "/gallery/letters-and-words/Screenshot%202026-07-26%20083244.jpg",
        label: "Which Letter Comes Next worksheet",
      },
      {
        src: "/gallery/letters-and-words/Screenshot%202026-07-26%20083310.jpg",
        label: "Letter Hunt worksheet",
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
        label: "Sums Without Pictures worksheet",
      },
      {
        src: "/gallery/numbers-and-counting-mats/Screenshot%202026-07-26%20114136.jpg",
        label: "All Three Together skip counting worksheet",
      },
      {
        src: "/gallery/numbers-and-counting-mats/Screenshot%202026-07-26%20114201.jpg",
        label: "Answer key page",
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
    relatedSlugs: ["letters-and-words"],
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
        label: "Letter C page — C is for Caring",
      },
      {
        src: "/gallery/abc-of-character/Screenshot%202026-07-26%20114328.jpg",
        label: "Letter F page — F is for Friendly",
      },
      {
        src: "/gallery/abc-of-character/Screenshot%202026-07-26%20114354.jpg",
        label: "Letter J page — J is for Joyful",
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
        label: "Letter F activity page preview",
      },
      {
        src: "/gallery/Alphabet%20Activity%20Book/Screenshot%202026-07-26%20071200.jpg",
        label: "Letter D activity worksheet",
      },
      {
        src: "/gallery/Alphabet%20Activity%20Book/Screenshot%202026-07-26%20071227.jpg",
        label: "Letter E tracing worksheet",
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
        label: "Butterfly's Flight Path wave and zigzag tracing worksheet",
      },
      {
        src: "/gallery/my-first-lines/Screenshot%202026-07-26%20080857.jpg",
        label: "Fish Makes Bubbles spiral tracing worksheet",
      },
      {
        src: "/gallery/my-first-lines/Screenshot%202026-07-26%20081002.jpg",
        label: "Bunny's Loopy Ears loop tracing worksheet",
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
    relatedSlugs: ["alphabet-adventures"],
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
        label: "Hollyhock flower colouring page",
      },
      {
        src: "/gallery/Flower%20Coloring%20Book/Screenshot%202026-07-26%20172022.jpg",
        label: "Kadamba flower colouring page",
      },
      {
        src: "/gallery/Flower%20Coloring%20Book/Screenshot%202026-07-26%20171857.jpg",
        label: "Contents page listing all 104 flowers in the Flowers Colouring Book",
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
        label: "Minutes Past and Minutes To clock worksheet",
      },
      {
        src: "/gallery/Timing%20and%20Shapes/Screenshot%202026-07-26%20171443.jpg",
        label: "Solids to Know shape worksheet",
      },
      {
        src: "/gallery/Timing%20and%20Shapes/Screenshot%202026-07-26%20171553.jpg",
        label: "Faces, Edges and Corners shape worksheet",
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
    relatedSlugs: ["numbers-and-counting-mats"],
    seoTitle: "Telling Time, Patterns and Shapes Workbook — Printable PDF for Kids",
    seoDescription:
      "100-page printable workbook for kids ages 5-9 — 20 clock worksheets, patterns, flat and solid shapes, and crosswords, with a full answer key. Instant PDF download.",
  },
  {
    slug: "cut-stick-and-make",
    title: "Cut, Stick and Make: 17 Big Cut and Paste Activities",
    cardTitle: "Cut, Stick and Make Activity Book",
    categoryLabel: "Cut, Stick and Make",
    category: "learning",
    tagline: "17 big cut-and-paste activities — build faces, houses, trains and gardens",
    price: 99,
    pageCount: 50,
    ageRange: "3-7 years",
    accent: "from-yellow-100 to-lime-50",
    emoji: "✂️",
    image: "/categories/Cut%20Stick%20and%20Make.png",
    bannerImage: "/banners/desktop/Cut%20Stick%20and%20Make.png",
    galleryImages: [
      {
        src: "/gallery/cut-stick-and-make/Screenshot%202026-08-04%20145908.jpg",
        label: "Contents page listing all 17 activities in the Cut, Stick and Make book",
      },
      {
        src: "/gallery/cut-stick-and-make/Screenshot%202026-08-04%20145939.jpg",
        label: "A Day in the Park cut-and-paste activity pieces",
      },
      {
        src: "/gallery/cut-stick-and-make/Screenshot%202026-08-04%20150015.jpg",
        label: "Fruit or Vegetable? cut-and-paste activity pieces",
      },
    ],
    rating: 4.6,
    purchaseCount: 40,
    pdfFile: "Cut Stick and Make activity Book.pdf",
    description:
      "A cut-and-paste activity book built entirely around one idea: bigger pieces work better. Every piece is a full 84mm square — nine times the area of a typical printable pack — so a three-year-old can cut it out with long, confident snips and stick it down without a fight.",
    whatsInside: [
      "50 pages: 17 cut-and-paste activities using 100 big 84mm pieces, four to a sheet",
      "Piece sheets print in colour; the pages they stick onto are line art, so every finished piece stands out",
      "A certificate of finishing at the end",
    ],
    whyItMatters: [
      "Big pieces are gripped in a whole fist and cut with long, confident snips — no tweezers, no giving up halfway",
      "Builds scissor control and glue-stick coordination before small, fiddly pieces are realistic",
      "Every finished page looks like something, which is most of the reward for a first-time cutter",
    ],
    longDescription:
      "Cut, Stick and Make is 50 printable pages built around one idea: bigger pieces work better for small hands. Every one of its 100 pieces is a full 84mm square, four to a sheet — nine times the area found in most printable cut-and-paste packs — so a piece can be gripped in a whole fist, cut with long confident snips, and stuck down without tweezers. Across 17 activities, kids build funny faces, houses, trains and gardens, match shapes, count and stick, and trace how a butterfly or a flower grows. Piece sheets print in colour; the pages they stick onto are line art, so the moment a piece goes down it stands out — and a certificate of finishing rounds off the book. Designed for children aged 3-7, this printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: [],
    seoTitle: "Cut, Stick and Make — Printable PDF for Kids",
    seoDescription:
      "50-page printable cut-and-paste activity book for kids ages 3-7, with 17 activities and 100 big 84mm pieces. Instant PDF download.",
  },
  {
    slug: "big-book-of-comparisons",
    title: "The Big Book of Comparisons: 100 Worksheets on Matching, Sorting and Comparing",
    cardTitle: "Big Book of Comparisons",
    categoryLabel: "Comparisons",
    category: "learning",
    tagline: "Match, sort and compare — 9 skills across 100 worksheets, from parents & babies to thick & thin",
    price: 129,
    pageCount: 116,
    ageRange: "3-6 years",
    accent: "from-teal-100 to-emerald-50",
    emoji: "⚖️",
    image: "/categories/Big%20Book%20of%20Comparisons.png",
    bannerImage: "/banners/desktop/Big%20Book%20of%20Comparisons.png",
    galleryImages: [
      {
        src: "/gallery/big-book-of-comparisons/Screenshot%202026-08-04%20145602.jpg",
        label: "Parents and Babies matching worksheet",
      },
      {
        src: "/gallery/big-book-of-comparisons/Screenshot%202026-08-04%20145745.jpg",
        label: "Parents and Babies matching worksheet, page 2",
      },
      {
        src: "/gallery/big-book-of-comparisons/Screenshot%202026-08-04%20145816.jpg",
        label: "Weight Comparison worksheet",
      },
    ],
    rating: 4.6,
    purchaseCount: 40,
    pdfFile: "Big Book of Comparisons.pdf",
    description:
      "A proper comparing workbook, not just a stack of worksheets — 100 pages across 9 skills, from matching a baby animal to its parent through to telling thick shapes from thin ones, each one practising the same core idea from a different angle.",
    whatsInside: [
      "116 pages: 100 worksheets across 9 comparing skills, from parents and babies through to thick and thin",
      "Sections get gradually harder, ending with subtler ideas like thick/thin that most children hear less often",
      "A certificate of finishing at the end",
    ],
    whyItMatters: [
      "Comparing is a child's first real thinking with numbers — noticing bigger, taller or heavier comes before counting means anything",
      "Reading each instruction aloud turns a tick-box page into a 'how do you know?' conversation",
      "100 worksheets is enough for months of one-or-two-pages-a-day practice without repeating a page",
    ],
    longDescription:
      "The Big Book of Comparisons is 116 printable pages built around the first real thinking a child does with numbers: noticing that one thing is bigger, taller, heavier or different from another. Across 9 sections — Parents and Babies, Which Weighs More, Short and Tall, Which Has More, Circle the Biggest, Connect the Same, Same as the One on the Left, What's Different, and Thick and Thin — 100 worksheets get gradually harder, starting with a gentle animal-matching page and ending with subtler ideas like thick and thin. A certificate of finishing rounds off the book. Designed for children aged 3-6, one or two pages a sitting is plenty — there's no prize for finishing quickly, and the sections don't have to be done in order. This printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["numbers-and-counting-mats", "time-patterns-and-shapes"],
    seoTitle: "The Big Book of Comparisons — Printable PDF for Kids",
    seoDescription:
      "116-page printable workbook for kids ages 3-6 with 100 worksheets on matching, sorting and comparing. Instant PDF download.",
  },
  {
    slug: "reading-comprehension",
    title: "Reading Comprehension Worksheets",
    categoryLabel: "Reading Comprehension",
    category: "learning",
    tagline: "38 short passages to read, trace and talk about together",
    price: 99,
    pageCount: 76,
    // Not stated on the pack itself — early-reader difficulty (short
    // sentences, tracing word, multiple choice) puts it a step past pure
    // letter-tracing packs like Alphabet Adventures (3-6), so this errs a
    // little older than those. Adjust once real customer feedback comes in.
    ageRange: "5-9 years",
    accent: "from-violet-100 to-fuchsia-50",
    emoji: "📖",
    image: "/categories/Reading%20Comprehension.png",
    bannerImage: "/banners/desktop/Reading%20Comprehension.png",
    galleryImages: [
      { src: "/gallery/Reading%20Comprehension/Screenshot%202026-08-07%20141127.jpg", label: "My Dog reading passage with multiple-choice questions" },
      { src: "/gallery/Reading%20Comprehension/Screenshot%202026-08-07%20141218.jpg", label: "The Lion reading passage with multiple-choice questions" },
      { src: "/gallery/Reading%20Comprehension/Screenshot%202026-08-07%20141259.jpg", label: "Elephant tracing word page" },
    ],
    rating: 4.5,
    purchaseCount: 40,
    pdfFile: "Reading Comprehension.pdf",
    description:
      "Thirty-eight short reading passages — from Dog and Ant to Winter and School — each paired with a big tracing word and three multiple-choice questions, built for kids just starting to read on their own.",
    whatsInside: [
      "Thirty eight short passages, from Dog and Ant to Winter and School",
      "A big tracing word for every topic, ready to colour in",
      "Three multiple choice questions after every passage",
      "Simple sentences, perfect for early and emerging readers",
    ],
    whyItMatters: [
      "Builds real reading confidence through short, repeatable passages instead of one long text",
      "The multiple-choice questions turn reading into an active check, not just word-calling",
      "A big tracing word per topic keeps handwriting practice in the mix alongside reading",
    ],
    longDescription:
      "Reading Comprehension Worksheets is 76 printable pages built around 38 short, simple passages — Dog, Ant, Lion, Elephant and 34 more, right through to Winter and School. Every topic gets two pages: a big tracing word to colour in, then a short passage of simple sentences followed by three multiple-choice questions to check what was actually understood, not just read aloud. Designed for early and emerging readers, it's built to be read together — a passage or two a sitting is plenty. This printable pack is instant-download only: no app, no login, just a PDF you can print at home or at any print shop. Download once, print as many times as you like.",
    relatedSlugs: ["letters-and-words", "alphabet-adventures"],
    seoTitle: "Reading Comprehension Worksheets — 38 Printable Passages for Kids",
    seoDescription:
      "76-page printable reading comprehension pack for early readers — 38 short passages, each with a tracing word and three multiple-choice questions. Instant PDF download.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBestSellers(count = 3, excludeSlugs: readonly string[] = []): Product[] {
  return [...products]
    .filter((p) => !p.comingSoon && !excludeSlugs.includes(p.slug))
    .sort((a, b) => b.purchaseCount - a.purchaseCount)
    .slice(0, count);
}
