import { Metadata } from 'next';
import FilterSidebar from '@/components/FilterSidebar';
import PageHero from '@/components/PageHero';
import Pagination from '@/components/Pagination';
import TeamCard from '@/components/cards/TeamCard';
import VacancyCard from '@/components/cards/VacancyCard';
import {
  apiGet,
  emptyPage,
  Paginated,
  TeamGrouped,
  Vacancy,
} from '@/lib/api';

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

export default async function CareersPage({ searchParams }: Props) {
  const isManagement = searchParams.view === 'management';

  const params = new URLSearchParams();
  if (searchParams.role && searchParams.role !== 'all')
    params.set('role', searchParams.role);
  if (searchParams.search) params.set('search', searchParams.search);
  params.set('page', searchParams.page ?? '1');
  params.set('limit', '8');

  const [vacancies, roles, team] = await Promise.all([
    isManagement
      ? Promise.resolve(emptyPage<Vacancy>())
      : apiGet<Paginated<Vacancy>>(`/vacancies?${params}`, emptyPage<Vacancy>()),
    apiGet<string[]>('/vacancies/roles', []),
    isManagement
      ? apiGet<TeamGrouped>('/team/grouped', {
          ceo: [],
          board: [],
          departmentHeads: [],
        })
      : Promise.resolve(null),
  ]);

  const hrefFor = (page: number) => {
    const next = new URLSearchParams(params);
    next.set('page', String(page));
    return `/careers?${next.toString()}`;
  };

  return (
    <main>
      <PageHero
        title="Careers"
        subtitle="Work on real products with real ownership — join the team building Devstrike."
      />

      <div className="container mx-auto flex flex-col gap-10 px-4 py-12 md:px-6 lg:flex-row lg:gap-14 lg:px-8">
        <FilterSidebar
          searchPlaceholder="Search roles"
          resetParams={['page', 'search', 'role']}
          groups={[
            {
              title: 'Status',
              param: 'view',
              options: [
                { label: 'Vacancies', value: 'vacancies' },
                { label: 'Management', value: 'management' },
              ],
            },
            ...(!isManagement
              ? [
                  {
                    title: 'Roles',
                    param: 'role',
                    options: [
                      { label: 'All', value: 'all' },
                      ...roles.map((r) => ({ label: r, value: r })),
                    ],
                  },
                ]
              : []),
          ]}
        />

        <div className="min-w-0 flex-1">
          {isManagement && team ? (
            <ManagementView team={team} />
          ) : (
            <>
              {vacancies.items.length === 0 ? (
                <p className="py-16 text-center text-gray-500">
                  No open roles match these filters right now.
                </p>
              ) : (
                <div>
                  {vacancies.items.map((vacancy) => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy} />
                  ))}
                </div>
              )}
              <Pagination
                page={vacancies.page}
                pages={vacancies.pages}
                hrefFor={hrefFor}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function ManagementView({ team }: { team: TeamGrouped }) {
  return (
    <div className="space-y-12">
      {team.ceo.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">CEO</h2>
          <div className="grid gap-8 border-b border-gray-100 pb-10 sm:grid-cols-2">
            {team.ceo.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}

      {team.board.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Board of Directors
          </h2>
          <div className="grid gap-8 border-b border-gray-100 pb-10 sm:grid-cols-2">
            {team.board.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}

      {team.departmentHeads.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Department Heads
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {team.departmentHeads.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
