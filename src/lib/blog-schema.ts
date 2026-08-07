// Per-post HowTo/ItemList schema data for the 8 existing blog posts audited
// in the SEO Implementation Pack's Step 23. Every entry here is a direct,
// verified transcription of that post's own visible headings/list items —
// nothing invented, no counts that don't match the live article. Posts not
// listed here simply don't get that schema type (either the pack didn't
// flag them as a candidate, or the visible content didn't genuinely support
// it once audited).

// HowTo candidates: teach-alphabet-to-preschoolers-without-screens and
// numbers-1-100-without-screens are the only 2 posts the pack named, and
// both genuinely walk through an ordered process in their visible H2s.
export const HOWTO_BY_SLUG: Record<
  string,
  { name: string; description: string; steps: { name: string; text: string }[] }
> = {
  "teach-alphabet-to-preschoolers-without-screens": {
    name: "How to Teach the Alphabet Without Screens",
    description:
      "A step-by-step way to teach preschoolers the alphabet without apps.",
    steps: [
      {
        name: "Start with sounds, not names",
        text: "When you point to a letter, say its sound, not its name — say \"buh\" for B, not \"bee\". Keep it playful and tied to a word your child knows.",
      },
      {
        name: "Trace before you write",
        text: "Trace the letter with a finger first, in the air or on the table. Then trace it with a crayon on paper, big and loose. Only once that feels easy, move to writing it without a guide.",
      },
      {
        name: "Connect each letter to a picture and a word",
        text: "Pair each letter with the same picture and word every time, so the connection sticks faster than a new image each time.",
      },
      {
        name: "Make it a five-minute habit, not a lesson",
        text: "Fold letter practice into moments that already exist — five minutes after breakfast, one page before bath time — rather than a dedicated study session.",
      },
      {
        name: "Let them get it \"wrong\" for a while",
        text: "Expect reversed letters and mixed-up sounds. This is normal and usually resolves naturally between ages 4 and 7.",
      },
      {
        name: "Follow a simple weekly rhythm",
        text: "Try one new letter Monday to Wednesday, review the last few letters on Thursday, let your child \"teach\" you a letter on Friday, and leave the weekend pressure-free.",
      },
    ],
  },
  "numbers-1-100-without-screens": {
    name: "How to Teach Numbers 1 to 100 Without Screens",
    description:
      "Simple, screen-free ways to help your child learn to count and recognise numbers 1-100.",
    steps: [
      {
        name: "Start with counting real things, not just reciting numbers",
        text: "Count real objects — steps on a staircase, grapes on a plate, toy cars lined up — to build the connection between a number word and an actual quantity.",
      },
      {
        name: "Use a hundred chart, and use it often",
        text: "A hundred chart (numbers 1-100 in a 10x10 grid) visually shows patterns, like every row starting with a new \"tens\" number, helping place value click faster.",
      },
      {
        name: "Practice writing the numbers, not just saying them",
        text: "Recognising a number and writing it are different skills. Tracing worksheets combine seeing the number shape, the hand movement to form it, and saying it aloud.",
      },
      {
        name: "Use skip-counting to make bigger numbers less intimidating",
        text: "Once a child is comfortable with 1-20, skip-counting by 10s (10, 20, 30...) makes the jump to 100 feel more manageable.",
      },
      {
        name: "Turn it into a game, not a lesson",
        text: "Try simple games like finding a specific number on a page, or a number scavenger hunt around the house, for repeated, low-pressure exposure.",
      },
      {
        name: "Keep sessions little and often",
        text: "Ten focused minutes a day, most days of the week, gets a child further than one long session once a week.",
      },
    ],
  },
};

// ItemList candidates: only added where the article's number of visible
// items actually matches — screen-free-activities genuinely has 20; diwali
// and raksha-bandhan are added with their REAL counts (6 and 5), not the
// pack's inflated title numbers (15 and 12), since the visible articles
// don't contain that many. fun-animal-facts-every-kid-should-know is
// deliberately omitted: its "30 facts" framing doesn't correspond to any
// discrete, countable list in the article (it's prose organised by animal,
// not a numbered list) — see the implementation report.
export const ITEMLIST_BY_SLUG: Record<string, { name: string; items: string[] }> = {
  "screen-free-activities-for-3-year-olds": {
    name: "20 Screen-Free Activities for 3 Year Olds",
    items: [
      "Coloring",
      "Playdough",
      "Sorting objects by color",
      "Sticker pages",
      "Simple puzzles",
      "Tracing lines and shapes",
      "Indoor obstacle course",
      "Freeze dance",
      "Balloon volleyball",
      "Simon says",
      "Animal walks",
      "Kitchen set pretend play",
      "Building a blanket fort",
      "Dress-up",
      "Storytelling with toys",
      "Letter tracing",
      "Counting everyday objects",
      "Matching games",
      "Water play",
      "\"Help me\" tasks",
    ],
  },
  "diwali-activities-for-kids": {
    name: "Diwali Activities for Kids",
    items: [
      "Let them help make the diyas",
      "Rangoli, kid-sized",
      "Storytelling before the fireworks",
      "A coloring corner for the quieter moments",
      "Let them help with the rangoli at the door",
      "A simple \"gratitude diya\" moment",
    ],
  },
  "raksha-bandhan-activities-for-kids": {
    name: "Raksha Bandhan Activities for Kids",
    items: [
      "Let them make their own rakhi",
      "Explain the story simply, before the ceremony",
      "A coloring activity while everyone gets ready",
      "Let siblings write a small note to each other",
      "A small role-reversal moment",
    ],
  },
};
