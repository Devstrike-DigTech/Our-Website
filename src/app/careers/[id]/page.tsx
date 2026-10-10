import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LuArrowRight, LuClock, LuWallet } from 'react-icons/lu';
import ApplyForm from '@/components/ApplyForm';
import PageHero from '@/components/PageHero';
import {
  CheckList,
  DetailSection,
  FactRow,
  Paragraphs,
  SideCard,
} from '@/components/ui/Content';
import Reveal from '@/components/ui/Reveal';
import { apiGet, Vacancy } from '@/lib/api';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  const vacancy = await apiGet<Vacancy | null>(`/vacancies/${params.id}`, null);
  return {
    title: vacancy
      ? `${vacancy.title} — Careers — Devstrike`
      : 'Careers — Devstrike',
    description: vacancy?.summary,
  };
}

export default async function VacancyDetailPage({ params }: Props) {
  const vacancy = await apiGet<Vacancy | null>(`/vacancies/${params.id}`, null);
  if (!vacancy) notFound();

  return (
    <main>
      <PageHero
        crumbs={[
          { label: 'Careers', href: '/careers' },
          { label: vacancy.title },
        ]}
        eyebrow={
          <div className='flex flex-wrap items-center gap-2'>
            <span className='eyebrow-light'>{vacancy.role}</span>
            {vacancy.project && (
              <span className='eyebrow-light'>{vacancy.project.title}</span>
            )}
          </div>
        }
        title={vacancy.title}
        subtitle={vacancy.summary}
      >
        <div className='flex flex-col items-start gap-5 sm:flex-row sm:items-center'>
          <ApplyForm
            vacancyId={vacancy.id}
            vacancyTitle={vacancy.title}
            className='!px-7 !py-4 !text-base'
          />
          <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/60'>
            <span className='flex items-center gap-2'>
              <LuClock className='h-4 w-4' /> {vacancy.payType}
            </span>
            {vacancy.salaryRange && (
              <span className='flex items-center gap-2'>
                <LuWallet className='h-4 w-4' /> {vacancy.salaryRange}
              </span>
            )}
          </div>
        </div>
      </PageHero>

      <div className='container grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16'>
        <article className='min-w-0'>
          {vacancy.fullDescription ? (
            <Reveal>
              <h2 className='mb-6 text-2xl font-extrabold text-ink md:text-3xl'>
                About the role
              </h2>
              <Paragraphs text={vacancy.fullDescription} />
            </Reveal>
          ) : (
            <Reveal>
              <Paragraphs text={vacancy.summary} />
            </Reveal>
          )}

          {vacancy.responsibilities.length > 0 && (
            <DetailSection
              title='Responsibilities'
              intro={vacancy.responsibilitiesIntro}
            >
              <CheckList items={vacancy.responsibilities} />
            </DetailSection>
          )}

          {vacancy.requirements.length > 0 && (
            <DetailSection
              title='Requirements'
              intro={vacancy.requirementsIntro}
            >
              <CheckList items={vacancy.requirements} />
            </DetailSection>
          )}
        </article>

        <aside className='space-y-5 lg:sticky lg:top-28 lg:self-start'>
          <SideCard title='Role overview'>
            <dl>
              <FactRow label='Role'>{vacancy.role}</FactRow>
              <FactRow label='Pay type'>{vacancy.payType}</FactRow>
              {vacancy.salaryRange && (
                <FactRow label='Salary'>{vacancy.salaryRange}</FactRow>
              )}
              {vacancy.project && (
                <FactRow label='Project'>
                  <Link
                    href={`/projects/${vacancy.project.slug}`}
                    className='inline-flex items-center gap-1 text-primary hover:underline'
                  >
                    {vacancy.project.title}
                  </Link>
                </FactRow>
              )}
            </dl>
            <ApplyForm
              vacancyId={vacancy.id}
              vacancyTitle={vacancy.title}
              className='mt-6 w-full !py-3.5'
            />
          </SideCard>

          {vacancy.skillSet.length > 0 && (
            <SideCard title='Skill set'>
              <ul className='flex flex-wrap gap-2'>
                {vacancy.skillSet.map((skill) => (
                  <li
                    key={skill}
                    className='chip !bg-primary/[0.06] !text-primary'
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </SideCard>
          )}

          <Link
            href='/careers'
            className='group flex items-center justify-between rounded-2xl border border-ink/[0.06] px-5 py-4 text-sm font-bold text-ink/70 transition-colors hover:border-primary/30 hover:text-primary'
          >
            Browse all open roles
            <LuArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </aside>
      </div>
    </main>
  );
}
