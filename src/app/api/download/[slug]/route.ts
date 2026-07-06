import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { getProductBySlug } from "@/lib/products";
import { verifyDownload } from "@/lib/download-token";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("oid");
  const sig = searchParams.get("sig");

  const product = getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  if (!orderId || !sig || !verifyDownload(orderId, slug, sig)) {
    return NextResponse.json({ error: "Invalid or expired download link" }, { status: 403 });
  }

  const filePath = path.join(process.cwd(), "public", "products", `${slug}.pdf`);

  let file: Buffer;
  try {
    file = await readFile(filePath);
  } catch {
    return NextResponse.json(
      { error: "This file hasn't been uploaded yet. Please contact support." },
      { status: 404 }
    );
  }

  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
