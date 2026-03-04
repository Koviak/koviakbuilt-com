import portfolioData from "@/data/portfolio.json";

export interface PortfolioProject {
  slug: string;
  title: string;
  location: string;
  description: string;
  coverImage: string;
  images: string[];
  sqft: string;
  bedrooms: number;
  bathrooms: number;
  year: string;
}

export function getAllProjects(): PortfolioProject[] {
  return portfolioData as PortfolioProject[];
}

export function getProjectBySlug(slug: string): PortfolioProject | null {
  return (
    (portfolioData as PortfolioProject[]).find((p) => p.slug === slug) || null
  );
}

export function getAllProjectSlugs(): string[] {
  return (portfolioData as PortfolioProject[]).map((p) => p.slug);
}
