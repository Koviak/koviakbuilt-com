'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, Bars3Icon, XMarkIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/our-portfolio', label: 'Our Portfolio' },
  { href: '/team', label: 'Team' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
] as const;

const LOCATIONS = ['Kerrville', 'Boerne', 'Comfort', 'Bandera'] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setLocationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1a1a1a] shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      {/* Top bar with phone and location */}
      <div
        className={`border-b border-white/10 transition-all duration-300 ${
          scrolled ? 'max-h-0 overflow-hidden opacity-0 border-none' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-4 py-1.5 text-sm sm:px-6 lg:px-8">
          {/* Location dropdown */}
          <div ref={locationRef} className="relative">
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="flex items-center gap-1 text-[#f5f0e8]/80 transition-colors hover:text-[#b87333]"
              aria-expanded={locationDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Select location"
            >
              <MapPinIcon className="h-4 w-4" />
              <span>Locations</span>
              <ChevronDownIcon
                className={`h-3 w-3 transition-transform duration-200 ${
                  locationDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {locationDropdownOpen && (
              <ul
                role="listbox"
                className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-md border border-white/10 bg-[#2a2a2a] shadow-xl"
              >
                {LOCATIONS.map((location) => (
                  <li key={location} role="option" aria-selected={false}>
                    <Link
                      href={`/locations/${location.toLowerCase()}`}
                      className="block px-4 py-2.5 text-[#f5f0e8] transition-colors hover:bg-[#b87333]/20 hover:text-[#b87333]"
                      onClick={() => setLocationDropdownOpen(false)}
                    >
                      {location}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Phone number */}
          <a
            href="tel:+18302412660"
            className="flex items-center gap-1.5 text-[#f5f0e8]/80 transition-colors hover:text-[#b87333]"
            aria-label="Call us at (830) 241-2660"
          >
            <PhoneIcon className="h-4 w-4" />
            <span>(830) 241-2660</span>
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Koviak Built - Home">
          <span className="font-playfair text-2xl font-bold tracking-wider text-[#b87333] lg:text-3xl">
            KOVIAK BUILT
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 lg:flex" role="menubar">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} role="none">
              <Link
                href={href}
                role="menuitem"
                className="relative px-4 py-2 text-sm font-medium uppercase tracking-widest text-[#f5f0e8] transition-colors hover:text-[#b87333] after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-[#b87333] after:transition-all after:duration-300 hover:after:w-3/4"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <a
            href="tel:+18302412660"
            className="rounded-sm border border-[#b87333] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-[#b87333] transition-all duration-300 hover:bg-[#b87333] hover:text-white"
          >
            Call Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-md p-2 text-[#f5f0e8] transition-colors hover:text-[#b87333] lg:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-0 z-40 bg-[#1a1a1a] transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Koviak Built - Home"
          >
            <span className="font-playfair text-2xl font-bold tracking-wider text-[#b87333]">
              KOVIAK BUILT
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-md p-2 text-[#f5f0e8] transition-colors hover:text-[#b87333]"
            aria-label="Close menu"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>
        <nav className="mt-8 px-6" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block border-b border-white/5 py-4 text-lg font-medium uppercase tracking-widest text-[#f5f0e8] transition-colors hover:text-[#b87333]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile location list */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#c9a227]">
              Locations We Serve
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {LOCATIONS.map((location) => (
                <li key={location}>
                  <Link
                    href={`/locations/${location.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1.5 text-sm text-[#f5f0e8]/70 transition-colors hover:text-[#b87333]"
                  >
                    <MapPinIcon className="h-3.5 w-3.5" />
                    {location}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile phone CTA */}
          <div className="mt-8">
            <a
              href="tel:+18302412660"
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#b87333] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#d4956a]"
            >
              <PhoneIcon className="h-5 w-5" />
              (830) 241-2660
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
