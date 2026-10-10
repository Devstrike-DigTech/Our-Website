import CallToAction from '@/components/home/CallToAction';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Hero from '@/components/home/Hero';
import Identity from '@/components/home/Identity';
import MissionVision from '@/components/home/MissionVision';
import Services from '@/components/home/Services';
import Story from '@/components/home/Story';
import { apiGet, emptyPage, Paginated, Project, Vacancy } from '@/lib/api';

export default async function Home() {
  const [all, ongoing, vacancies, industries] = await Promise.all([
    apiGet<Paginated<Project>>('/projects?limit=1', emptyPage<Project>()),
    apiGet<Paginated<Project>>(
      '/projects?status=ongoing&limit=5',
      emptyPage<Project>()
    ),
    apiGet<Paginated<Vacancy>>('/vacancies?limit=1', emptyPage<Vacancy>()),
    apiGet<string[]>('/projects/industries', []),
  ]);

  return (
    <main>
      <Hero
        nowBuilding={ongoing.items[0]}
        stats={{
          projects: all.total,
          ongoing: ongoing.total,
          openRoles: vacancies.total,
          industries: industries.length,
        }}
      />
      <Services />
      <FeaturedProjects projects={ongoing.items} />
      <Identity />
      <MissionVision />
      <Story />
      <CallToAction />
    </main>
  );
}
