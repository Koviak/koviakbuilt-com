import type { Metadata } from 'next';
import TeamMemberCard from '@/components/TeamMemberCard';
import SectionHeading from '@/components/SectionHeading';
import teamData from '@/data/team.json';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the dedicated team behind Koviak Built. Our experienced professionals bring passion, expertise, and integrity to every custom home we build in the Texas Hill Country.',
};

export default function TeamPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#111111] to-background pb-16 pt-40 lg:pt-48">
        <div className="absolute inset-0 bg-[url('/images/home/hero-poster.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            The People Behind the Craft
          </p>
          <h1 className="mt-4 font-playfair text-4xl font-bold text-cream sm:text-5xl lg:text-6xl">
            Our Team
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/60">
            A dedicated group of professionals united by a shared commitment to building
            exceptional homes with integrity and craftsmanship.
          </p>
          <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-copper to-gold" />
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamData.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            title="Join the Koviak Built Family"
            subtitle="Interested in working with a team that values craftsmanship and community? We're always looking for talented individuals."
          />
          <a
            href="mailto:sales@koviakbuilt.com"
            className="mt-8 inline-flex items-center rounded-sm bg-copper px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-copper-light"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
