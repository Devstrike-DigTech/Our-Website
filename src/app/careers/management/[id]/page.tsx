import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXTwitter,
  faLinkedin,
  faDribbble,
  faGithub,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { LuArrowLeft } from 'react-icons/lu';
import PageHero from '@/components/PageHero';
import {
  CheckList,
  DetailSection,
  Paragraphs,
  SideCard,
} from '@/components/ui/Content';
import Avatar from '@/components/ui/Avatar';
import Reveal from '@/components/ui/Reveal';
import { apiGet, TeamMember } from '@/lib/api';

interface Props {
  params: { id: string };
}

const SOCIAL_ICONS: Record<string, typeof faXTwitter> = {
  twitter: faXTwitter,
  x: faXTwitter,
  linkedin: faLinkedin,
  dribbble: faDribbble,
  github: faGithub,
  instagram: faInstagram,
};

const TIER_LABEL: Record<TeamMember['tier'], string> = {
  ceo: 'Chief Executive Officer',
  board: 'Board of Directors',
  'department-head': 'Department Head',
};

export async function generateMetadata({ params }: Props) {
  const member = await apiGet<TeamMember | null>(`/team/${params.id}`, null);
  return {
    title: member ? `${member.name} — Devstrike` : 'Management — Devstrike',
    description: member?.summary,
  };
}

export default async function TeamProfilePage({ params }: Props) {
  const member = await apiGet<TeamMember | null>(`/team/${params.id}`, null);
  if (!member) notFound();

  const socials = Object.entries(member.socials ?? {}).filter(([, url]) => url);

  return (
    <main>
      <PageHero
        crumbs={[
          { label: 'Management', href: '/careers?view=management' },
          { label: member.name },
        ]}
        eyebrow={
          <div>
            <Avatar
              name={member.name}
              src={member.avatarUrl}
              size={96}
              className='!ring-white/10'
            />
            <p className='mt-6 text-sm font-bold uppercase tracking-[0.16em] text-pink-300'>
              {member.title}
            </p>
          </div>
        }
        title={member.name}
        subtitle={member.summary}
      >
        {socials.length > 0 && (
          <div className='flex gap-2.5'>
            {socials.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={key}
                className='flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:text-white'
              >
                <FontAwesomeIcon
                  icon={
                    (SOCIAL_ICONS[key.toLowerCase()] ?? faXTwitter) as IconProp
                  }
                  className='h-4 w-4'
                />
              </a>
            ))}
          </div>
        )}
      </PageHero>

      <div className='container grid gap-12 py-14 md:py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16'>
        <article className='min-w-0'>
          {member.bio && (
            <Reveal>
              <h2 className='mb-6 text-2xl font-extrabold text-ink md:text-3xl'>
                Bio
              </h2>
              <Paragraphs text={member.bio} />
            </Reveal>
          )}

          {member.responsibilities.length > 0 && (
            <DetailSection
              title='Responsibilities'
              intro={member.responsibilitiesIntro}
            >
              <CheckList items={member.responsibilities} />
            </DetailSection>
          )}
        </article>

        <aside className='space-y-5 lg:sticky lg:top-28 lg:self-start'>
          <SideCard title='Leadership group'>
            <p className='font-extrabold text-ink'>{TIER_LABEL[member.tier]}</p>
          </SideCard>

          {member.skills.length > 0 && (
            <SideCard title='Skills'>
              {member.skillsIntro && (
                <p className='mb-4 text-sm leading-relaxed text-ink/55'>
                  {member.skillsIntro}
                </p>
              )}
              <ul className='flex flex-wrap gap-2'>
                {member.skills.map((skill) => (
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
            href='/careers?view=management'
            className='group flex items-center gap-2 rounded-2xl border border-ink/[0.06] px-5 py-4 text-sm font-bold text-ink/70 transition-colors hover:border-primary/30 hover:text-primary'
          >
            <LuArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
            Back to management
          </Link>
        </aside>
      </div>
    </main>
  );
}
