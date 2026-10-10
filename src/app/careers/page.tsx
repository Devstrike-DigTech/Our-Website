import { Metadata } from 'next';
import FilterSidebar from '@/components/FilterSidebar';
import PageHero from '@/components/PageHero';
import Pagination from '@/components/Pagination';
import TeamCard from '@/components/cards/TeamCard';
import VacancyCard from '@/components/cards/VacancyCard';
import { EmptyState, HeroTabs } from '@/components/ui/Content';
import Reveal from '@/components/ui/Reveal';
import {
  apiGet,
  emptyPage,
  Paginated,
  TeamGrouped,
  TeamMember,
  Vacancy,
} from '@/lib/api';
import { plural } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Careers — Devstrike',
  description:
    'Join Devstrike Digital Limited — open roles across our project teams, and the people leading them.',
};

interface Props {
  searchParams: {
    view?: string;
    role?: string;
    search?: string;
    page?: string;
  };
}

const EMPTY_TEAM: TeamGrouped = { ceo: [], board: [], departmentHeads: [] };

export default async function CareersPage({ searchParams }: Props) {
  const isManagement = searchParams.view === 'management';

  const params = new URLSearchParams();
  if (searchParams.role && searchParams.role !== 'all')
    params.set('role', searchParams.role);
  if (searchParams.search) params.set('search', searchParams.search);
  params.set('page', searchParams.page ?? '1');
  params.set('limit', '8');

  const [vacancies, allVacancies, roles, team] = await Promise.all([
    isManagement
      ? Promise.resolve(emptyPage<Vacancy>())
      : apiGet<Paginated<Vacancy>>(
          `/vacancies?${params}`,
          emptyPage<Vacancy>()
        ),
    apiGet<Paginated<Vacancy>>('/vacancies?limit=1', emptyPage<Vacancy>()),
    isManagement
      ? Promise.resolve([])
      : apiGet<string[]>('/vacancies/roles', []),
    apiGet<TeamGrouped>('/team/grouped', EMPTY_TEAM),
  ]);

  const teamCount =
    team.ceo.length + team.board.length + team.departmentHeads.length;

  const hrefFor = (page: number) => {
    const next = new URLSearchParams(params);
    next.set('page', String(page));
    next.delete('limit');
    return `/careers?${next.toString()}#results`;
  };

  return (
    <main>
      <PageHero
        eyebrow={<span className='eyebrow-light'>Careers</span>}
        title={
          <>
            Build products that matter —{' '}
            <span className='text-gradient-light'>with us.</span>
          </>
        }
        subtitle='Work on real products with real ownership. Join a project team, or meet the people leading Devstrike.'
      >
        <HeroTabs
          tabs={[
            {
              label: 'Open roles',
              href: '/careers',
              active: !isManagement,
              count: allVacancies.total,
            },
            {
              label: 'Management',
              href: '/careers?view=management',
              active: isManagement,
              count: teamCount,
            },
          ]}
        />
      </PageHero>

      {isManagement ? (
        <ManagementView team={team} />
      ) : (
        <section
          id='results'
          className='container flex scroll-mt-24 flex-col gap-10 py-14 md:py-20 lg:flex-row lg:gap-12'
        >
          <FilterSidebar
            searchPlaceholder='Search roles'
            groups={[
              {
                title: 'Role',
                param: 'role',
                options: [
                  { label: 'All roles', value: 'all' },
                  ...roles.map((r) => ({ label: r, value: r })),
                ],
              },
            ]}
          />

          <div className='min-w-0 flex-1'>
            {vacancies.items.length === 0 ? (
              <EmptyState
                title='No roles found'
                description='No open roles match these filters right now — try another role or check back soon.'
                resetHref='/careers'
              />
            ) : (
              <>
                <p className='mb-6 text-sm font-semibold text-ink/50'>
                  Showing {vacancies.items.length} of{' '}
                  {plural(vacancies.total, 'open role')}
                </p>
                <div className='grid gap-5'>
                  {vacancies.items.map((vacancy, i) => (
                    <Reveal key={vacancy.id} delay={Math.min(i, 3) * 70}>
                      <VacancyCard vacancy={vacancy} />
                    </Reveal>
                  ))}
                </div>
              </>
            )}
            <Pagination
              page={vacancies.page}
              pages={vacancies.pages}
              hrefFor={hrefFor}
            />
          </div>
        </section>
      )}
    </main>
  );
}

function TeamGroup({
  title,
  members,
  columns,
}: {
  title: string;
  members: TeamMember[];
  columns: string;
}) {
  if (members.length === 0) return null;
  return (
    <div>
      <Reveal>
        <div className='mb-6 flex items-center gap-4'>
          <h2 className='text-2xl font-extrabold text-ink'>{title}</h2>
          <span className='h-px flex-1 bg-ink/[0.07]' />
          <span className='text-sm font-semibold text-ink/40'>
            {members.length}
          </span>
        </div>
      </Reveal>
      <div className={`grid gap-5 ${columns}`}>
        {members.map((member, i) => (
          <Reveal key={member.id} delay={(i % 3) * 80} className='h-full'>
            <TeamCard
              member={member}
              featured={title === 'Chief Executive Officer'}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ManagementView({ team }: { team: TeamGrouped }) {
  if (team.ceo.length + team.board.length + team.departmentHeads.length === 0) {
    return (
      <div className='container py-20'>
        <EmptyState
          title='Team profiles coming soon'
          description='We are putting together profiles of the people leading Devstrike.'
        />
      </div>
    );
  }

  return (
    <section className='container space-y-16 py-14 md:py-20'>
      <TeamGroup
        title='Chief Executive Officer'
        members={team.ceo}
        columns=''
      />
      <TeamGroup
        title='Board of Directors'
        members={team.board}
        columns='sm:grid-cols-2 lg:grid-cols-4'
      />
      <TeamGroup
        title='Department Heads'
        members={team.departmentHeads}
        columns='sm:grid-cols-2 lg:grid-cols-4'
      />
    </section>
  );
}
