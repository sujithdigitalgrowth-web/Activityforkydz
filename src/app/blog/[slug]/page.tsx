import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Markdown } from "@/lib/markdown";
import { blogPostingJsonLd, breadcrumbJsonLd, getBaseUrl } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = post.seoTitle ?? post.title;

  return {
    title,
    description: post.seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.publishedDate,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const baseUrl = getBaseUrl();
  const jsonLd = [
    blogPostingJsonLd(post),
    breadcrumbJsonLd([
      { name: "Home", url: baseUrl },
      { name: "Blog", url: `${baseUrl}/blog` },
      { name: post.title, url: `${baseUrl}/blog/${post.slug}` },
    ]),
  ];

  const formattedDate = new Date(post.publishedDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-zinc-500 mb-4">
        <Link href="/" className="hover:text-orange-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-orange-600">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-700">{post.title}</span>
      </nav>

      {post.featuredImage ? (
        <div className="relative overflow-hidden rounded-2xl aspect-[16/9] w-full mb-8">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt ?? post.title}
            fill
            sizes="(max-width: 768px) 90vw, 700px"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className={`rounded-2xl aspect-[16/9] w-full mb-8 bg-gradient-to-br ${post.placeholderAccent} flex items-center justify-center`}
        >
          <span className="text-8xl">{post.placeholderEmoji}</span>
        </div>
      )}

      <h1 className="font-heading text-3xl font-semibold text-zinc-900">{post.title}</h1>
      <p className="text-sm text-zinc-500 mt-2">{formattedDate}</p>

      <div className="mt-6">
        <Markdown content={post.content} />
      </div>
    </div>
  );
}
