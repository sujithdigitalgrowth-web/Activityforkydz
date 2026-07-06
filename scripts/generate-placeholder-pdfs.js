// One-off script: generates a minimal valid placeholder PDF per product in public/products/.
// Replace these files with the real activity packs before launch.
const fs = require("fs");
const path = require("path");

// Kept as plain JS (not importing the TS catalog) so this script has zero build-step dependency.
// slug/title/pageCount must stay in sync with src/lib/products.ts.
const products = [
  { slug: "animal-friends", title: "Animal Friends Coloring & Learning Pack", pageCount: 105 },
  { slug: "birds-of-the-world", title: "Birds of the World Coloring Pack", pageCount: 60 },
  { slug: "flower-garden", title: "Flower Garden Coloring & Learning Pack", pageCount: 50 },
  { slug: "numbers-1-to-100", title: "Numbers 1-100 Practice & Coloring Pack", pageCount: 110 },
  { slug: "nature-and-seasons", title: "Nature & Seasons Coloring Pack", pageCount: 55 },
  { slug: "space-explorers", title: "Space Explorers Coloring Pack", pageCount: 65 },
  { slug: "hindu-festivals", title: "Hindu Festivals Activity Pack", pageCount: 60 },
  { slug: "alphabet-adventures", title: "Alphabet Adventures A-Z Pack", pageCount: 52 },
  { slug: "vehicles-and-machines", title: "Vehicles & Machines Coloring Pack", pageCount: 58 },
  { slug: "dinosaur-discovery", title: "Dinosaur Discovery Pack", pageCount: 62 },
];

function escapePdfText(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdf(title, pageCount) {
  const lines = [
    `${title}`,
    `${pageCount} pages - PLACEHOLDER FILE`,
    "Replace this with the real activityforKydz PDF before launch.",
  ];

  const streamContent = lines
    .map((line, i) => `BT /F1 20 Tf 50 ${700 - i * 40} Td (${escapePdfText(line)}) Tj ET`)
    .join("\n");

  const objects = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  objects.push(
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>"
  );
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects.push(`<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return Buffer.from(pdf, "latin1");
}

const outDir = path.join(__dirname, "..", "public", "products");
fs.mkdirSync(outDir, { recursive: true });

for (const product of products) {
  const pdf = buildPdf(product.title, product.pageCount);
  fs.writeFileSync(path.join(outDir, `${product.slug}.pdf`), pdf);
  console.log(`Generated ${product.slug}.pdf`);
}
