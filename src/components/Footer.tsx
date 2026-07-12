import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-orange-100 mt-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/logo/111.png"
              alt="activityforKydz logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <p className="font-heading font-semibold text-zinc-900">{site.name}</p>
          </div>
          <p className="text-zinc-600">
            Printable, screen-free activity packs for kids. Delivered by email, made for
            print.
          </p>
        </div>

        <div>
          <p className="font-semibold text-zinc-900 mb-2">Company</p>
          <ul className="space-y-1 text-zinc-600">
            <li>
              <Link href="/about" className="hover:text-orange-600">About us</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-orange-600">Blog</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-600">Contact & support</Link>
            </li>
            <li>
              <a href={`mailto:${site.supportEmail}`} className="hover:text-orange-600">
                {site.supportEmail}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-zinc-900 mb-2">Legal</p>
          <ul className="space-y-1 text-zinc-600">
            <li>
              <Link href="/privacy-policy" className="hover:text-orange-600">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-orange-600">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-orange-600">
                Refund & Cancellation Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-orange-100">
        <div className="max-w-[1400px] mx-auto px-6 py-4 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>&copy; {new Date().getFullYear()} {site.name}. All products are digital downloads — no physical shipping.</p>
        </div>
      </div>
    </footer>
  );
}
