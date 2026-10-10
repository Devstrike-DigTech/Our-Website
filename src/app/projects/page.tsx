import { Metadata } from 'next';
import FilterSidebar from '@/components/FilterSidebar';
import PageHero from '@/components/PageHero';
import Pagination from '@/components/Pagination';
import ProjectCard from '@/components/cards/ProjectCard';
import { EmptyState } from '@/components/ui/Content';
import Reveal from '@/components/ui/Reveal';
import { apiGet, emptyPage, Paginated, Project } from '@/lib/api';
import { plural } from '@/lib/format';

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
  params.set('limit', '6');

  const [data, industries] = await Promise.all([
    apiGet<Paginated<Project>>(`/projects?${params}`, emptyPage<Project>()),
    apiGet<string[]>('/projects/industries', []),
  ]);

  const hrefFor = (page: number) => {
    const next = new URLSearchParams(params);
    next.set('page', String(page));
    next.delete('limit');
    return `/projects?${next.toString()}#results`;
  };

  return (
    <main>
      <PageHero
        eyebrow={<span className='eyebrow-light'>Our portfolio</span>}
        title={
          <>
            Products that solve{' '}
            <span className='text-gradient-light'>real problems.</span>
          </>
        }
        subtitle='The products we are building — each one a solution to a real problem, engineered the tech way.'
      />

      <section
        id='results'
        className='container flex scroll-mt-24 flex-col gap-10 py-14 md:py-20 lg:flex-row lg:gap-12'
      >
        <FilterSidebar
          searchPlaceholder='Search projects'
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

        <div className='min-w-0 flex-1'>
          {data.items.length === 0 ? (
            <EmptyState
              title='No projects found'
              description='Nothing matches these filters yet — try another status or industry.'
              resetHref='/projects'
            />
          ) : (
            <>
              <p className='mb-6 text-sm font-semibold text-ink/50'>
                Showing {data.items.length} of {plural(data.total, 'project')}
              </p>
              <div className='grid gap-6 md:grid-cols-2'>
                {data.items.map((project, i) => (
                  <Reveal
                    key={project.id}
                    delay={(i % 2) * 90}
                    className='h-full'
                  >
                    <ProjectCard project={project} priority={i === 0} />
                  </Reveal>
                ))}
              </div>
            </>
          )}

          <Pagination page={data.page} pages={data.pages} hrefFor={hrefFor} />
        </div>
      </section>
    </main>
  );
}
