import { notFound } from 'next/navigation';
import ApplyForm from '@/components/ApplyForm';
import Breadcrumb from '@/components/Breadcrumb';
import PageHero from '@/components/PageHero';
import { apiGet, Vacancy } from '@/lib/api';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const vacancy = await apiGet<Vacancy | null>(`/vacancies/${params.id}`, null);
  return {
    title: vacancy ? `${vacancy.title} — Careers — Devstrike` : 'Careers — Devstrike',
    description: vacancy?.summary,
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

export default async function VacancyDetailPage({ params }: Props) {
  const vacancy = await apiGet<Vacancy | null>(`/vacancies/${params.id}`, null);
  if (!vacancy) notFound();

  return (
    <main>
      <PageHero
        title="Careers"
        subtitle="Work on real products with real ownership — join the team building Devstrike."
      />
      <Breadcrumb
        items={[
          { label: 'Careers', href: '/careers' },
          { label: 'Job Information' },
        ]}
      />

      <div className="container mx-auto px-4 pb-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{vacancy.title}</h1>
              {vacancy.project && (
                <p className="mt-1 text-sm font-medium text-primary">
                  • {vacancy.project.title}
                </p>
              )}
            </div>
            <ApplyForm vacancyId={vacancy.id} vacancyTitle={vacancy.title} />
          </div>

          <div className="mt-6">
            <Paragraphs text={vacancy.summary} />
            {vacancy.skillSet.length > 0 && (
              <p className="text-gray-700">
                <span className="font-semibold">Skill Set:</span>{' '}
                {vacancy.skillSet.join(', ')}.
              </p>
            )}
            <div className="mt-3 flex items-center gap-6 text-sm text-gray-500">
              <span>{vacancy.payType}</span>
              {vacancy.salaryRange && <span>{vacancy.salaryRange}</span>}
            </div>
          </div>

          {vacancy.fullDescription && (
            <section className="mt-10 border-t border-gray-100 pt-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Full Job Description
              </h2>
              <Paragraphs text={vacancy.fullDescription} />
            </section>
          )}

          {vacancy.responsibilities.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Responsibilities
              </h2>
              {vacancy.responsibilitiesIntro && (
                <p className="mb-4 leading-relaxed text-gray-600">
                  {vacancy.responsibilitiesIntro}
                </p>
              )}
              <ol className="list-decimal space-y-2 pl-5 text-gray-600">
                {vacancy.responsibilities.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {vacancy.requirements.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Requirements
              </h2>
              {vacancy.requirementsIntro && (
                <p className="mb-4 leading-relaxed text-gray-600">
                  {vacancy.requirementsIntro}
                </p>
              )}
              <ol className="list-decimal space-y-2 pl-5 text-gray-600">
                {vacancy.requirements.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
