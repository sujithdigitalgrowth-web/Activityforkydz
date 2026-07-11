import type { AnchorHTMLAttributes, ImgHTMLAttributes, ReactElement, ReactNode } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeReact from "rehype-react";

// Matches the site's own domain (with or without www, http or https) so
// links written as full URLs in post content still become client-side
// <Link> navigation instead of a full page reload.
const OWN_DOMAIN = /^https?:\/\/(www\.)?activityforkydz\.com(\/.*)?$/;

function MarkdownLink({ href = "", children }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const domainMatch = href.match(OWN_DOMAIN);
  const isInternal = href.startsWith("/") || Boolean(domainMatch);
  const linkClassName = "text-orange-600 font-medium hover:underline";

  if (isInternal) {
    const path = href.startsWith("/") ? href : domainMatch?.[2] || "/";
    return (
      <Link href={path} className={linkClassName}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
      {children}
    </a>
  );
}

// A stray top-level "# Heading" in a post body shouldn't produce a second
// page H1 — the page renders `post.title` as the single H1 separately, so
// any h1 encountered in content is demoted to the same style as h2.
const headingClassName = "font-heading text-xl font-semibold text-zinc-900 mt-8 mb-2";

const components = {
  h1: (props: { children?: ReactNode }) => <h2 className={headingClassName} {...props} />,
  h2: (props: { children?: ReactNode }) => <h2 className={headingClassName} {...props} />,
  h3: (props: { children?: ReactNode }) => (
    <h3 className="font-heading text-lg font-semibold text-zinc-900 mt-6 mb-2" {...props} />
  ),
  p: (props: { children?: ReactNode }) => (
    <p className="text-zinc-700 leading-relaxed mt-4" {...props} />
  ),
  a: MarkdownLink,
  ul: (props: { children?: ReactNode }) => (
    <ul className="list-disc list-inside space-y-1 mt-4 text-zinc-700" {...props} />
  ),
  ol: (props: { children?: ReactNode }) => (
    <ol className="list-decimal list-inside space-y-1 mt-4 text-zinc-700" {...props} />
  ),
  hr: () => <hr className="my-8 border-orange-100" />,
  table: (props: { children?: ReactNode }) => (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props: { children?: ReactNode }) => (
    <th className="border border-orange-100 bg-orange-50 px-3 py-2 text-left font-semibold" {...props} />
  ),
  td: (props: { children?: ReactNode }) => (
    <td className="border border-orange-100 px-3 py-2" {...props} />
  ),
  // Post images have arbitrary, unknown dimensions from markdown; next/image
  // requires width/height or a static import, neither of which fits
  // free-form content authored as plain markdown.
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-xl my-4 w-full" {...props} alt={props.alt ?? ""} />
  ),
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeReact, {
    Fragment,
    jsx,
    jsxs,
    elementAttributeNameCase: "react",
    components,
  });

export function Markdown({ content }: { content: string }) {
  const file = processor.processSync(content);
  return file.result as ReactElement;
}
