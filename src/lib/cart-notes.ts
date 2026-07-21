// Razorpay `notes` values cap at 256 chars each. A cart's slug list is joined
// with commas and chunked across items_0, items_1, ... keys so it never overflows.
const CHUNK_SIZE = 240;

export function encodeSlugsToNotes(slugs: string[]): Record<string, string> {
  const joined = slugs.join(",");
  const notes: Record<string, string> = {};

  let i = 0;
  let index = 0;
  while (i < joined.length) {
    notes[`items_${index}`] = joined.slice(i, i + CHUNK_SIZE);
    i += CHUNK_SIZE;
    index += 1;
  }

  return notes;
}

export function decodeSlugsFromNotes(notes: Record<string, unknown>): string[] {
  const chunks: string[] = [];
  let index = 0;
  while (typeof notes[`items_${index}`] === "string") {
    chunks.push(notes[`items_${index}`] as string);
    index += 1;
  }

  const joined = chunks.join("");
  return joined ? joined.split(",").filter(Boolean) : [];
}
