export type Product = {
  slug: string;
  title: string;
  tagline: string;
  price: number; // INR, whole rupees
  pageCount: number;
  ageRange: string;
  accent: string; // tailwind color pair for the card
  emoji: string;
  image?: string; // optional real cover image path (e.g. "/products/animal-friends-cover.jpg"); falls back to emoji + gradient when unset
  rating: number; // out of 5. Placeholder for now — replace with real average once you have reviews.
  purchaseCount: number; // placeholder for now — replace with real order counts once you have them
  description: string;
  whatsInside: string[];
  whyItMatters: string[];
};

export const products: Product[] = [
  {
    slug: "animal-friends",
    title: "Animal Friends Coloring & Learning Pack",
    tagline: "100+ pages of lions, pandas, elephants and every animal kids ask about",
    price: 79,
    pageCount: 105,
    ageRange: "3-8 years",
    accent: "from-amber-100 to-orange-50",
    emoji: "🦁",
    rating: 4.8,
    purchaseCount: 3240,
    description:
      "A big, friendly collection of animals from the jungle, the farm, the ocean and the sky — each one drawn simply enough for small hands to color in, with a fun fact underneath to read together.",
    whatsInside: [
      "105 pages covering 60+ animals across land, sea and sky",
      "Simple, bold outlines sized for crayons and thick pencils",
      "One fun animal fact per page for read-aloud time",
      "A 4-page 'spot the animal' game at the end",
    ],
    whyItMatters: [
      "Builds fine motor control through coloring within lines",
      "Introduces animal names and habitats in a low-pressure way",
      "Gives you a ready answer for 'I'm bored' without opening a screen",
    ],
  },
  {
    slug: "birds-of-the-world",
    title: "Birds of the World Coloring Pack",
    tagline: "Peacocks, parrots, owls and more, with names in English",
    price: 69,
    pageCount: 60,
    ageRange: "4-9 years",
    accent: "from-sky-100 to-blue-50",
    emoji: "🦜",
    rating: 4.6,
    purchaseCount: 1460,
    description:
      "A quieter, prettier pack for kids who love birds — peacocks in full feather, tiny sparrows, owls at night — good for a calm afternoon at the table.",
    whatsInside: [
      "60 pages featuring 40+ birds from around the world",
      "Large single-bird pages plus a few 'birds in a garden' scenes",
      "Bird name labels in simple English for early readers",
    ],
    whyItMatters: [
      "Encourages patience and attention to detail",
      "A gentle way to talk about nature and different habitats",
      "Great for kids who find animal packs 'too busy'",
    ],
  },
  {
    slug: "flower-garden",
    title: "Flower Garden Coloring & Learning Pack",
    tagline: "Roses, sunflowers, marigolds and the names of every flower in the garden",
    price: 59,
    pageCount: 50,
    ageRange: "3-8 years",
    accent: "from-pink-100 to-rose-50",
    emoji: "🌻",
    rating: 4.7,
    purchaseCount: 1290,
    description:
      "A soft, pretty pack of flowers to color, with a few pages on how a seed grows into a flower — a nice pairing with an actual walk in the garden or park.",
    whatsInside: [
      "50 pages of individual flowers plus full garden scenes",
      "A 4-page 'life of a flower' sequence to color in order",
      "Flower names in simple English",
    ],
    whyItMatters: [
      "Introduces early science ideas like growth and seasons",
      "Calm, low-stimulation activity good for winding down before bed",
      "Pairs naturally with outdoor time, not just screen replacement",
    ],
  },
  {
    slug: "numbers-1-to-100",
    title: "Numbers 1-100 Practice & Coloring Pack",
    tagline: "Trace, count and color your way from 1 to 100",
    price: 89,
    pageCount: 110,
    ageRange: "4-7 years",
    accent: "from-emerald-100 to-teal-50",
    emoji: "🔢",
    rating: 4.9,
    purchaseCount: 3680,
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
  },
  {
    slug: "nature-and-seasons",
    title: "Nature & Seasons Coloring Pack",
    tagline: "Rain, snow, autumn leaves and summer suns — coloring pages for every season",
    price: 69,
    pageCount: 55,
    ageRange: "3-8 years",
    accent: "from-lime-100 to-green-50",
    emoji: "🍂",
    rating: 4.5,
    purchaseCount: 1120,
    description:
      "A pack built around the four seasons and weather — good for tying coloring time to what's actually happening outside the window that day.",
    whatsInside: [
      "55 pages split across summer, monsoon, autumn and winter",
      "Weather scenes: rain, clouds, snow, sunshine",
      "A simple 'what season is it today' activity page",
    ],
    whyItMatters: [
      "Connects an indoor activity to the real world outside",
      "Introduces season and weather vocabulary naturally",
      "Easy to rotate pages with the actual calendar",
    ],
  },
  {
    slug: "space-explorers",
    title: "Space Explorers Coloring Pack",
    tagline: "Rockets, planets, astronauts and the moon",
    price: 79,
    pageCount: 65,
    ageRange: "4-9 years",
    accent: "from-indigo-100 to-violet-50",
    emoji: "🚀",
    rating: 4.7,
    purchaseCount: 1940,
    description:
      "For the kid who asks 'what's beyond the sky' — planets, astronauts, rockets and a simple page on each planet in our solar system.",
    whatsInside: [
      "65 pages covering rockets, astronauts and all 8 planets",
      "One-line facts about each planet for read-aloud time",
      "A 'design your own rocket' blank activity page",
    ],
    whyItMatters: [
      "Feeds natural curiosity about space without a screen",
      "Introduces the solar system in a simple, memorable way",
      "The blank design page encourages open-ended creativity",
    ],
  },
  {
    slug: "hindu-festivals",
    title: "Hindu Festivals Activity Pack",
    tagline: "Diwali diyas, Holi colors, Ganesh Chaturthi and more, explained simply",
    price: 79,
    pageCount: 60,
    ageRange: "4-10 years",
    accent: "from-yellow-100 to-amber-50",
    emoji: "🪔",
    rating: 4.8,
    purchaseCount: 2950,
    description:
      "Coloring and activity pages built around Diwali, Holi, Ganesh Chaturthi, Navratri and Raksha Bandhan, with a simple one-paragraph story behind each festival that's easy to read aloud to a young child.",
    whatsInside: [
      "60 pages across 5 major festivals",
      "A short, simple explanation of each festival written for kids",
      "Craft-style pages: diya to color, rangoli to design, rakhi to decorate",
    ],
    whyItMatters: [
      "Helps pass on festival traditions and their meaning, not just the visuals",
      "Good for the actual festival week, not just any random day",
      "Gives grandparents and parents an easy way to start the conversation",
    ],
  },
  {
    slug: "alphabet-adventures",
    title: "Alphabet Adventures A-Z Pack",
    tagline: "One letter, one picture, one word per page from A to Z",
    price: 69,
    pageCount: 52,
    ageRange: "3-6 years",
    accent: "from-fuchsia-100 to-pink-50",
    emoji: "🔤",
    rating: 4.6,
    purchaseCount: 1670,
    description:
      "A clean, simple A-Z pack pairing each letter with a picture and word — for kids just starting to connect letters to sounds.",
    whatsInside: [
      "52 pages: capital and small letter tracing plus a picture per letter",
      "One 'find the letter' spotting game every 5 letters",
      "Large print sized for early pencil grip",
    ],
    whyItMatters: [
      "Builds the letter-sound-picture connection early readers need",
      "Short enough to do one letter a day without it feeling like homework",
      "Good first step before proper handwriting practice",
    ],
  },
  {
    slug: "vehicles-and-machines",
    title: "Vehicles & Machines Coloring Pack",
    tagline: "Cars, trains, planes, tractors and every vehicle a kid points at",
    price: 69,
    pageCount: 58,
    ageRange: "3-8 years",
    accent: "from-red-100 to-orange-50",
    emoji: "🚂",
    rating: 4.7,
    purchaseCount: 1580,
    description:
      "For the kid who names every truck on the road — cars, trains, planes, boats, tractors and construction machines, drawn clearly enough to color fast.",
    whatsInside: [
      "58 pages covering road, rail, air, water and construction vehicles",
      "A 'match the vehicle to where it works' activity page",
      "Bold, simple outlines for quick, satisfying coloring sessions",
    ],
    whyItMatters: [
      "Turns an existing obsession into a focused, screen-free activity",
      "Introduces vocabulary around transport and jobs",
      "Good for restless kids who want to finish something quickly",
    ],
  },
  {
    slug: "dinosaur-discovery",
    title: "Dinosaur Discovery Pack",
    tagline: "T-Rex, Triceratops and 20+ more, with simple facts for each",
    price: 79,
    pageCount: 62,
    ageRange: "4-9 years",
    accent: "from-teal-100 to-cyan-50",
    emoji: "🦕",
    rating: 4.8,
    purchaseCount: 2150,
    description:
      "A dinosaur-obsessed kid's dream pack — 20+ dinosaurs to color, each with a one-line fact, plus a fossil dig-style spot-the-difference page.",
    whatsInside: [
      "62 pages featuring 20+ dinosaurs, land and sea",
      "One simple fact per dinosaur for read-aloud time",
      "A 'spot the difference' fossil dig activity page",
    ],
    whyItMatters: [
      "Feeds an existing interest instead of fighting it",
      "Introduces early science vocabulary (fossil, extinct, herbivore)",
      "Reliable go-to for long car rides or waiting rooms",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getBestSellers(count = 3): Product[] {
  return [...products].sort((a, b) => b.purchaseCount - a.purchaseCount).slice(0, count);
}
