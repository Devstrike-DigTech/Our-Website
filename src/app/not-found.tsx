import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';
import Aurora from '@/components/ui/Aurora';

export default function NotFound() {
  return (
    <main className='relative flex min-h-[80vh] items-center overflow-hidden bg-ink-950 text-white'>
      <Aurora />
      <div className='container relative py-40 text-center'>
        <p className='animate-fade-up text-[7rem] font-extrabold leading-none tracking-tighter text-gradient-light md:text-[11rem]'>
          404
        </p>
        <h1
          className='mx-auto mt-4 max-w-xl animate-fade-up text-3xl font-extrabold md:text-4xl'
          style={{ animationDelay: '100ms' }}
        >
          We&apos;re cooking something amazing for this page.
        </h1>
        <p
          className='mx-auto mt-4 max-w-md animate-fade-up text-lg text-white/60'
          style={{ animationDelay: '180ms' }}
        >
          It isn&apos;t ready yet — or the link may be wrong. Here&apos;s where
          to go next.
        </p>
        <div
          className='mt-10 flex animate-fade-up flex-col justify-center gap-3 sm:flex-row'
          style={{ animationDelay: '260ms' }}
        >
          <Link href='/' className='btn-primary group !px-7 !py-4'>
            Back to home
            <LuArrowRight className='btn-arrow h-4 w-4' />
          </Link>
          <Link href='/projects' className='btn-ghost-light !px-7 !py-4'>
            Explore projects
          </Link>
        </div>
      </div>
    </main>
  );
}
