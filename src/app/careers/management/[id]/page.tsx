import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faXTwitter,
  faLinkedin,
  faDribbble,
  faGithub,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import Breadcrumb from '@/components/Breadcrumb';
import PageHero from '@/components/PageHero';
import { apiGet, resolveImage, TeamMember } from '@/lib/api';

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

export async function generateMetadata({ params }: Props) {
  const member = await apiGet<TeamMember | null>(`/team/${params.id}`, null);
  return {
    title: member ? `${member.name} — Devstrike` : 'Management — Devstrike',
    description: member?.summary,
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

export default async function TeamProfilePage({ params }: Props) {
  const member = await apiGet<TeamMember | null>(`/team/${params.id}`, null);
  if (!member) notFound();

  const socials = Object.entries(member.socials ?? {}).filter(([, url]) => url);

  return (
    <main>
      <PageHero
        title="Careers"
        subtitle="Work on real products with real ownership — join the team building Devstrike."
      />
      <Breadcrumb
        items={[
          { label: 'Management', href: '/careers?view=management' },
          { label: 'Profile' },
        ]}
      />

      <div className="container mx-auto px-4 pb-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-start justify-between">
            <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              {member.avatarUrl ? (
                <Image
                  src={resolveImage(member.avatarUrl)!}
                  alt={member.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : (
                <FontAwesomeIcon icon={faUser} className="h-8 w-8 text-gray-400" />
              )}
            </div>

            {socials.length > 0 && (
              <div className="flex gap-4">
                {socials.map(([key, url]) => (
                  <Link
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="text-gray-500 transition-colors hover:text-primary"
                  >
                    <FontAwesomeIcon
                      icon={(SOCIAL_ICONS[key.toLowerCase()] ?? faXTwitter) as IconProp}
                      className="h-5 w-5"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">{member.name}</h1>
          <p className="mt-1 font-medium text-primary">{member.title}</p>
          {member.summary && (
            <p className="mt-3 leading-relaxed text-gray-600">{member.summary}</p>
          )}

          {member.bio && (
            <section className="mt-10 border-t border-gray-100 pt-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Bio</h2>
              <Paragraphs text={member.bio} />
            </section>
          )}

          {member.responsibilities.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Responsibilities
              </h2>
              {member.responsibilitiesIntro && (
                <p className="mb-4 leading-relaxed text-gray-600">
                  {member.responsibilitiesIntro}
                </p>
              )}
              <ol className="list-decimal space-y-2 pl-5 text-gray-600">
                {member.responsibilities.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {member.skills.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-xl font-bold text-gray-900">Skills</h2>
              {member.skillsIntro && (
                <p className="mb-4 leading-relaxed text-gray-600">
                  {member.skillsIntro}
                </p>
              )}
              <ol className="list-decimal space-y-2 pl-5 text-gray-600">
                {member.skills.map((item, i) => (
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
