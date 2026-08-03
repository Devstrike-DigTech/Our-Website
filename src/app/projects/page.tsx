import { Metadata } from 'next';
import FilterSidebar from '@/components/FilterSidebar';
import PageHero from '@/components/PageHero';
import Pagination from '@/components/Pagination';
import ProjectCard from '@/components/cards/ProjectCard';
import { apiGet, emptyPage, Paginated, Project } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Projects — Devstrike',
  description:
    'Products we are building at Devstrike Digital Limited — explore ongoing, upcoming, and concluded projects.',
};

interface Props {
  searchParams: {
    status?: string;
    industry?: string;
    search?: string;
    page?: string;
  };
}

export default async function ProjectsPage({ searchParams }: Props) {
  const params = new URLSearchParams();
  if (searchParams.status && searchParams.status !== 'all')
    params.set('status', searchParams.status);
  if (searchParams.industry) params.set('industry', searchParams.industry);
  if (searchParams.search) params.set('search', searchParams.search);
  params.set('page', searchParams.page ?? '1');
  params.set('limit', '5');

  const [data, industries] = await Promise.all([
    apiGet<Paginated<Project>>(`/projects?${params}`, emptyPage<Project>()),
    apiGet<string[]>('/projects/industries', []),
  ]);

  const hrefFor = (page: number) => {
    const next = new URLSearchParams(params);
    next.set('page', String(page));
    return `/projects?${next.toString()}`;
  };

  return (
    <main>
      <PageHero
        title="Projects"
        subtitle="The products we are building — each one a solution to a real problem, engineered the tech way."
      />

      <div className="container mx-auto flex flex-col gap-10 px-4 py-12 md:px-6 lg:flex-row lg:gap-14 lg:px-8">
        <FilterSidebar
          searchPlaceholder="Search projects"
          groups={[
            {
              title: 'Status',
              param: 'status',
              options: [
                { label: 'All', value: 'all' },
                { label: 'Ongoing', value: 'ongoing' },
                { label: 'Upcoming', value: 'upcoming' },
                { label: 'Concluded', value: 'concluded' },
              ],
            },
            {
              title: 'Industry',
              param: 'industry',
              options: [
                { label: 'All', value: 'all' },
                ...industries.map((i) => ({ label: i, value: i })),
              ],
            },
          ]}
        />

        <div className="min-w-0 flex-1">
          {data.items.length === 0 ? (
            <p className="py-16 text-center text-gray-500">
              No projects match these filters yet.
            </p>
          ) : (
            <div className="space-y-12">
              {data.items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <Pagination page={data.page} pages={data.pages} hrefFor={hrefFor} />
        </div>
      </div>
    </main>
  );
}
