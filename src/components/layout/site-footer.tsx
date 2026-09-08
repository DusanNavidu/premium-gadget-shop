import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-gray-400 py-12 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              T
            </div>
            <span className="font-bold text-white tracking-wider text-base">TechVault</span>
          </div>
          <p className="text-xs text-gray-400">
            Premium digital storefront specialized in high-performance mobile, computing, and tech hardware.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Categories</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/shop" className="hover:text-white transition-colors">Mobile Phones</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Computers & Laptops</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Tech Gadgets</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Assessment Note</h4>
          <p className="text-xs text-gray-400">
            Developed for the Creative Front-End & UI/UX Intern Practical Assessment at DartCodes (Pvt) Ltd.
          </p>
        </div>
      </div>

      <div className="container mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} TechVault. All rights reserved.</p>
        <p>Built with Next.js & Tailwind CSS.</p>
      </div>
    </footer>
  );
}