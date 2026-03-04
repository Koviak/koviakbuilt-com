import Link from 'next/link';

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/our-portfolio', label: 'Our Portfolio' },
  { href: '/team', label: 'Team' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;

const LOCATIONS_SERVED = [
  'Kerrville',
  'Boerne',
  'Comfort',
  'Bandera',
  'Fredericksburg',
  'Hunt',
  'Ingram',
  'Center Point',
] as const;

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
    </svg>
  );
}

function HouzzIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.5 2.1L6 5.8v4.4l6.5-3.7 6.5 3.7V5.8L12.5 2.1zm0 5.5L6 11.3v4.4l6.5-3.7 6.5 3.7v-4.4l-6.5-3.7zm0 5.5L6 16.8v4.4l6.5-3.7 6.5 3.7v-4.4l-6.5-3.7z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: 'https://facebook.com/koviakbuilt', label: 'Facebook', icon: FacebookIcon },
  { href: 'https://instagram.com/koviakbuilt', label: 'Instagram', icon: InstagramIcon },
  { href: 'https://houzz.com/pro/koviakbuilt', label: 'Houzz', icon: HouzzIcon },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-[#f5f0e8]" role="contentinfo">
      {/* Copper accent line at top */}
      <div className="h-1 bg-gradient-to-r from-[#8a5526] via-[#b87333] to-[#8a5526]" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: About */}
          <div>
            <Link href="/" aria-label="Koviak Built - Home">
              <span className="font-playfair text-2xl font-bold tracking-wider text-[#b87333]">
                KOVIAK BUILT
              </span>
            </Link>
            <p className="mt-2 font-playfair text-lg italic text-[#c9a227]">
              Building Dreams in Hill Country
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f5f0e8]/70">
              Koviak Built is a luxury custom home builder proudly serving the Texas Hill
              Country. With decades of experience and an unwavering commitment to
              craftsmanship, we transform your vision into a home that stands the test of
              time.
            </p>
            {/* Social icons */}
            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b87333]/30 text-[#f5f0e8]/60 transition-all duration-300 hover:border-[#b87333] hover:bg-[#b87333]/10 hover:text-[#b87333]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-[#b87333]">
              Quick Links
            </h3>
            <div className="mt-2 h-0.5 w-12 bg-[#b87333]/40" />
            <ul className="mt-6 space-y-3">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#f5f0e8]/70 transition-colors duration-200 hover:text-[#b87333]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Locations served */}
            <h3 className="mt-10 font-playfair text-lg font-semibold text-[#b87333]">
              Locations Served
            </h3>
            <div className="mt-2 h-0.5 w-12 bg-[#b87333]/40" />
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
              {LOCATIONS_SERVED.map((location) => (
                <li
                  key={location}
                  className="text-sm text-[#f5f0e8]/70"
                >
                  {location}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-playfair text-lg font-semibold text-[#b87333]">
              Contact Us
            </h3>
            <div className="mt-2 h-0.5 w-12 bg-[#b87333]/40" />
            <address className="mt-6 space-y-4 not-italic">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#b87333]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <div className="text-sm text-[#f5f0e8]/70">
                  <p>Kerrville, TX</p>
                  <p>Texas Hill Country</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-[#b87333]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <a
                  href="tel:+18302412660"
                  className="text-sm text-[#f5f0e8]/70 transition-colors hover:text-[#b87333]"
                >
                  (830) 241-2660
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-[#b87333]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href="mailto:info@koviakbuilt.com"
                  className="text-sm text-[#f5f0e8]/70 transition-colors hover:text-[#b87333]"
                >
                  info@koviakbuilt.com
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-[#f5f0e8]/40">
            &copy; {currentYear} Koviak Built. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-[#f5f0e8]/40 transition-colors hover:text-[#b87333]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[#f5f0e8]/40 transition-colors hover:text-[#b87333]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
