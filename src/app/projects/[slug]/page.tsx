import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu';
import ImageCarousel from '@/components/ImageCarousel';
import PageHero from '@/components/PageHero';
import VacancyCard from '@/components/cards/VacancyCard';
import {
  CheckList,
  DetailSection,
  FactRow,
  Paragraphs,
  SideCard,
} from '@/components/ui/Content';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import StatusBadge from '@/components/ui/StatusBadge';
import { apiGet, Project } from '@/lib/api';
import { plural } from '@/lib/format';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const project = await apiGet<Project | null>(
    `/projects/${params.slug}`,
    null
  );
  return {
    title: project ? `${project.title} — Devstrike` : 'Project — Devstrike',
    description: project?.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await apiGet<Project | null>(
    `/projects/${params.slug}`,
    null
  );
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
        image={project.coverImage}
        crumbs={[
          { label: 'Projects', href: '/projects' },
          { label: project.title },
        ]}
        eyebrow={
          <div className='flex flex-wrap items-center gap-2'>
            <StatusBadge status={project.status} glass />
            <span className='eyebrow-light'>{project.industry}</span>
          </div>
        }
        title={project.title}
        subtitle={project.summary}
      >
        <div className='flex flex-col gap-3 sm:flex-row'>
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='btn group bg-white text-ink shadow-xl hover:-translate-y-0.5'
            >
              Visit website
              <LuArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
            </a>
          )}
          {openVacancies.length > 0 && (
            <a href='#open-roles' className='btn-ghost-light'>
              {plural(openVacancies.length, 'open role')}
            </a>
          )}
          {project.investUrl && (
            <Link href={project.investUrl} className='btn-ghost-light'>
              Invest
            </Link>
          )}
        </div>
      </PageHero>

      <div className='container grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16'>
        <article className='min-w-0'>
          {images.length > 0 && (
            <Reveal className='mb-12'>
              <ImageCarousel images={images} alt={project.title} />
            </Reveal>
          )}

          <Reveal>
            <Paragraphs text={project.description} />
          </Reveal>

          {project.identity && (
            <DetailSection title='Project identity'>
              <Paragraphs text={project.identity} />
            </DetailSection>
          )}

          {project.motive && (
            <DetailSection title='Project motive'>
              <Paragraphs text={project.motive} />
            </DetailSection>
          )}

          {project.features.length > 0 && (
            <DetailSection title='Features' intro={project.featuresIntro}>
              <CheckList items={project.features} columns={2} />
            </DetailSection>
          )}
        </article>

        <aside className='space-y-5 lg:sticky lg:top-28 lg:self-start'>
          <SideCard title='At a glance'>
            <dl>
              <FactRow label='Status'>
                <StatusBadge status={project.status} />
              </FactRow>
              <FactRow label='Industry'>{project.industry}</FactRow>
              <FactRow label='Open roles'>{openVacancies.length}</FactRow>
              {project.websiteUrl && (
                <FactRow label='Website'>
                  <a
                    href={project.websiteUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1 text-primary hover:underline'
                  >
                    Visit <LuArrowUpRight className='h-3.5 w-3.5' />
                  </a>
                </FactRow>
              )}
            </dl>
          </SideCard>

          <div className='relative overflow-hidden rounded-2xl bg-brand-gradient-d p-6 text-white shadow-glow'>
            <div className='bg-grid absolute inset-0' aria-hidden />
            <div className='relative'>
              <p className='text-lg font-extrabold'>
                Interested in this project?
              </p>
              <p className='mt-1.5 text-sm leading-relaxed text-white/75'>
                Whether you want to partner, invest, or build with us —
                let&apos;s talk.
              </p>
              <a
                href='#footer'
                className='btn group mt-5 w-full bg-white text-ink hover:-translate-y-0.5'
              >
                Get in touch
                <LuArrowRight className='btn-arrow h-4 w-4' />
              </a>
            </div>
          </div>
        </aside>
      </div>

      <section
        id='open-roles'
        className='scroll-mt-24 bg-surface py-20 md:py-28'
      >
        <div className='container'>
          <Reveal>
            <SectionHeading
              eyebrow='Join this project'
              title='Open positions'
              description='Want to work with great talent and build software people rely on? Join the team — we’re hiring.'
            />
          </Reveal>

          {openVacancies.length === 0 ? (
            <Reveal className='mt-10'>
              <p className='text-ink/60'>
                No open positions on this project right now — browse{' '}
                <Link
                  href='/careers'
                  className='font-bold text-primary hover:underline'
                >
                  all vacancies
                </Link>
                .
              </p>
            </Reveal>
          ) : (
            <div className='mt-12 grid gap-5 lg:grid-cols-2'>
              {openVacancies.map((vacancy, i) => (
                <Reveal
                  key={vacancy.id}
                  delay={(i % 2) * 90}
                  className='h-full'
                >
                  <VacancyCard vacancy={{ ...vacancy, project }} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
