interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`animate-fade-in ${centered ? 'text-center' : ''}`}>
      <h2
        className={`font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl ${
          light ? 'text-[#1a1a1a]' : 'text-[#f5f0e8]'
        }`}
      >
        {title}
      </h2>

      {/* Copper underline accent */}
      <div
        className={`mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#b87333] to-[#c9a227] ${
          centered ? 'mx-auto' : ''
        }`}
        aria-hidden="true"
      />

      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-[#1a1a1a]/70' : 'text-[#f5f0e8]/60'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
