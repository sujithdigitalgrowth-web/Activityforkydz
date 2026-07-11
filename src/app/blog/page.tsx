import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Screen-Free Activity Ideas for Kids",
  description:
    "Simple, screen-free activity ideas, festival guides, and printable-friendly inspiration for kids, from activityforKydz.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="font-heading text-3xl font-semibold text-zinc-900">Blog</h1>
      <p className="text-lg text-zinc-600 mt-2">
        Screen-free activity ideas, festival guides, and printable inspiration for kids.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {posts.map((post) => {
          const formattedDate = new Date(post.publishedDate).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-orange-100 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div
                className={`aspect-[4/3] w-full bg-gradient-to-br ${post.placeholderAccent} flex items-center justify-center`}
              >
                <span className="text-7xl">{post.placeholderEmoji}</span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-heading font-semibold text-zinc-900 leading-snug line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-600 mt-1 line-clamp-3">{post.excerpt}</p>
                <p className="text-xs text-zinc-500 mt-3">{formattedDate}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
