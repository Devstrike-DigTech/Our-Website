import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ImageCarousel from '@/components/ImageCarousel';
import PageHero from '@/components/PageHero';
import VacancyCard from '@/components/cards/VacancyCard';
import { apiGet, Project } from '@/lib/api';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const project = await apiGet<Project | null>(`/projects/${params.slug}`, null);
  return {
    title: project ? `${project.title} — Devstrike` : 'Project — Devstrike',
    description: project?.summary,
  };
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split('\n')
        .filter(Boolean)
        .map((para, i) => (
          <p key={i} className="mb-4 leading-relaxed text-gray-600">
            {para}
          </p>
        ))}
    </>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await apiGet<Project | null>(`/projects/${params.slug}`, null);
  if (!project) notFound();

  const openVacancies = project.vacancies ?? [];
  const images =
    project.images.length > 0
      ? project.images
      : project.coverImage
        ? [project.coverImage]
        : [];

  return (
    <main>
      <PageHero
        title="Projects"
        subtitle="The products we are building — each one a solution to a real problem."
      />
      <Breadcrumb
        items={[
          { label: 'Projects', href: '/projects' },
          { label: 'Project Information' },
        ]}
      />

      <div className="container mx-auto px-4 pb-16 md:px-6 lg:px-8">
        <ImageCarousel images={images} alt={project.title} />

        <div className="mx-auto mt-8 max-w-4xl">
          <p className="text-sm font-medium text-primary">
            Vacancy : {openVacancies.length} Open
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            <div className="flex gap-3">
              {project.investUrl && (
                <Link
                  href={project.investUrl}
                  className="rounded-md bg-primary/10 px-5 py-2.5 font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  Invest
                </Link>
              )}
              {project.websiteUrl && (
                <Link
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-brand-gradient-b px-5 py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Visit Website
                </Link>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Paragraphs text={project.description} />
          </div>

          {project.identity && (
            <section className="mt-10 border-t border-gray-100 pt-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Project Identity
              </h2>
              <Paragraphs text={project.identity} />
            </section>
          )}

          {project.motive && (
            <section className="mt-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Project Motive
              </h2>
              <Paragraphs text={project.motive} />
            </section>
          )}

          {project.features.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Features</h2>
              {project.featuresIntro && (
                <p className="mb-4 leading-relaxed text-gray-600">
                  {project.featuresIntro}
                </p>
              )}
              <ol className="list-decimal space-y-2 pl-5 text-gray-600">
                {project.features.map((feature, i) => (
                  <li key={i} className="leading-relaxed">
                    {feature}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="mt-12 border-t border-gray-100 pt-8">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Open positions
            </h2>
            <p className="mb-8 max-w-xl text-gray-600">
              Want to work with some of the best global talent and build software
              used by all the companies you know and love? Join the team — we’re
              hiring!
            </p>

            {openVacancies.length === 0 ? (
              <p className="text-gray-500">
                No open positions on this project right now — check{' '}
                <Link href="/careers" className="text-primary hover:underline">
                  all vacancies
                </Link>
                .
              </p>
            ) : (
              <div>
                {openVacancies.map((vacancy) => (
                  <VacancyCard
                    key={vacancy.id}
                    vacancy={{ ...vacancy, project }}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
