'use client';

import { useState } from 'react';
import Image from 'next/image';
import { EnvelopeIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  email?: string;
  photo: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <article className="group flex flex-col items-center rounded-lg bg-[#2a2a2a] p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#b87333]/5">
      {/* Circular photo with copper border */}
      <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-[#b87333]/60 transition-all duration-500 group-hover:border-[#b87333] sm:h-48 sm:w-48">
        <Image
          src={member.photo}
          alt={`${member.name} - ${member.role}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 160px, 192px"
        />
      </div>

      {/* Name */}
      <h3 className="mt-6 font-playfair text-xl font-bold text-[#f5f0e8] sm:text-2xl">
        {member.name}
      </h3>

      {/* Role in copper/gold */}
      <p className="mt-1.5 text-sm font-medium uppercase tracking-wider text-[#c9a227]">
        {member.role}
      </p>

      {/* Bio - expandable on mobile, always visible on desktop */}
      <div className="mt-4 w-full">
        <p
          className={`text-sm leading-relaxed text-[#f5f0e8]/60 transition-all duration-300 ${
            bioExpanded ? '' : 'line-clamp-3 sm:line-clamp-none'
          }`}
        >
          {member.bio}
        </p>
        {/* Expand button - visible only on mobile when bio is long */}
        {member.bio.length > 120 && (
          <button
            onClick={() => setBioExpanded(!bioExpanded)}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#b87333] transition-colors hover:text-[#d4956a] sm:hidden"
            aria-expanded={bioExpanded}
            aria-label={bioExpanded ? 'Show less' : 'Read more'}
          >
            {bioExpanded ? 'Show Less' : 'Read More'}
            <ChevronDownIcon
              className={`h-3 w-3 transition-transform duration-200 ${
                bioExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        )}
      </div>

      {/* Email link */}
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          className="mt-5 inline-flex items-center gap-2 rounded-sm border border-[#b87333]/30 px-4 py-2 text-sm text-[#b87333] transition-all duration-300 hover:border-[#b87333] hover:bg-[#b87333]/10"
          aria-label={`Email ${member.name}`}
        >
          <EnvelopeIcon className="h-4 w-4" />
          {member.email}
        </a>
      )}
    </article>
  );
}
