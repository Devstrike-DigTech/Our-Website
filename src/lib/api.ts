export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4001";

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  identity: string;
  motive: string;
  featuresIntro: string;
  features: string[];
  status: "ongoing" | "upcoming" | "concluded";
  industry: string;
  websiteUrl?: string;
  investUrl?: string;
  coverImage?: string;
  images: string[];
  openVacancies?: number;
  vacancies?: Vacancy[];
}

export interface Vacancy {
  id: string;
  title: string;
  role: string;
  summary: string;
  fullDescription: string;
  responsibilitiesIntro: string;
  responsibilities: string[];
  requirementsIntro: string;
  requirements: string[];
  skillSet: string[];
  payType: string;
  salaryRange: string;
  status: "open" | "closed";
  project?: Project;
  projectId?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  tier: "ceo" | "board" | "department-head";
  summary: string;
  bio: string;
  responsibilitiesIntro: string;
  responsibilities: string[];
  skillsIntro: string;
  skills: string[];
  socials: Record<string, string>;
  avatarUrl?: string;
}

export interface TeamGrouped {
  ceo: TeamMember[];
  board: TeamMember[];
  departmentHeads: TeamMember[];
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  type: "blog" | "news";
  category: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  createdAt: string;
}

/**
 * Server-side fetch helper. Never throws on network failure — pages render
 * their empty states instead of crashing when the API is down.
 */
export async function apiGet<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/api${path}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export const emptyPage = <T,>(): Paginated<T> => ({
  items: [],
  total: 0,
  page: 1,
  pages: 1,
});

export function resolveImage(src?: string): string | undefined {
  if (!src) return undefined;
  if (src.startsWith("/uploads")) return `${API_URL}${src}`;
  return src;
}
