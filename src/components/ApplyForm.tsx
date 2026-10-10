'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { LuArrowRight, LuFileText, LuUploadCloud, LuX } from 'react-icons/lu';
import { API_URL } from '@/lib/api';

interface ApplyFormProps {
  vacancyId: string;
  vacancyTitle: string;
  className?: string;
}

const ACCEPTED = ['.pdf', '.doc', '.docx'];
const MAX_BYTES = 5 * 1024 * 1024;

/** "Apply for this role" button + modal form with CV upload. */
const ApplyForm: React.FC<ApplyFormProps> = ({
  vacancyId,
  vacancyTitle,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', coverNote: '' });
  const [cv, setCv] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const pickFile = (file: File | undefined) => {
    if (!file) return;
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!ACCEPTED.includes(ext)) {
      toast.error('CV must be a PDF, DOC, or DOCX file.');
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error('CV must be 5MB or smaller.');
      return;
    }
    setCv(file);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv) {
      toast.error('Please attach your CV (PDF, DOC, or DOCX).');
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      data.append('vacancyId', vacancyId);
      data.append('name', form.name);
      data.append('email', form.email);
      data.append('coverNote', form.coverNote);
      data.append('cv', cv);
      const res = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        body: data,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? 'Submission failed');
      }
      toast.success('Application submitted — we will get back to you!');
      setOpen(false);
      setForm({ name: '', email: '', coverNote: '' });
      setCv(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className={`btn-primary group ${className}`}
      >
        Apply for this role
        <LuArrowRight className='btn-arrow h-4 w-4' />
      </button>

      {open &&
        createPortal(
          <div
            className='fixed inset-0 z-[70] flex items-end justify-center bg-ink-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4'
            onClick={() => setOpen(false)}
            role='dialog'
            aria-modal='true'
            aria-labelledby='apply-title'
          >
            <div
              className='max-h-[92vh] w-full max-w-lg animate-pop-in overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl md:p-8'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex items-start justify-between gap-4'>
                <div>
                  <p className='eyebrow'>Application</p>
                  <h2
                    id='apply-title'
                    className='mt-2 text-2xl font-extrabold text-ink'
                  >
                    {vacancyTitle}
                  </h2>
                </div>
                <button
                  type='button'
                  aria-label='Close'
                  onClick={() => setOpen(false)}
                  className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink'
                >
                  <LuX className='h-5 w-5' />
                </button>
              </div>
              <p className='mt-2 text-sm text-ink/55'>
                Tell us a little about yourself and attach your CV.
              </p>

              <form onSubmit={submit} className='mt-6 space-y-4'>
                <label className='block'>
                  <span className='mb-1.5 block text-sm font-bold text-ink/70'>
                    Full name
                  </span>
                  <input
                    type='text'
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className='input'
                    required
                    minLength={2}
                    autoFocus
                  />
                </label>
                <label className='block'>
                  <span className='mb-1.5 block text-sm font-bold text-ink/70'>
                    Email address
                  </span>
                  <input
                    type='email'
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className='input'
                    required
                  />
                </label>
                <label className='block'>
                  <span className='mb-1.5 block text-sm font-bold text-ink/70'>
                    Cover note{' '}
                    <span className='font-medium text-ink/40'>(optional)</span>
                  </span>
                  <textarea
                    value={form.coverNote}
                    onChange={(e) =>
                      setForm({ ...form, coverNote: e.target.value })
                    }
                    className='input min-h-[110px] resize-y'
                    placeholder='What draws you to this role?'
                  />
                </label>

                <div>
                  <span className='mb-1.5 block text-sm font-bold text-ink/70'>
                    CV
                  </span>
                  <button
                    type='button'
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragging(false);
                      pickFile(e.dataTransfer.files?.[0]);
                    }}
                    className={`flex w-full items-center gap-4 rounded-2xl border-2 border-dashed p-4 text-left transition-colors ${
                      dragging
                        ? 'border-primary bg-primary/[0.04]'
                        : cv
                        ? 'border-emerald-400/60 bg-emerald-50/50'
                        : 'border-ink/10 hover:border-primary/40 hover:bg-surface'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        cv
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : 'bg-primary/[0.08] text-primary'
                      }`}
                    >
                      {cv ? (
                        <LuFileText className='h-5 w-5' />
                      ) : (
                        <LuUploadCloud className='h-5 w-5' />
                      )}
                    </span>
                    <span className='min-w-0'>
                      <span className='block truncate text-sm font-bold text-ink'>
                        {cv ? cv.name : 'Drop your CV here or click to browse'}
                      </span>
                      <span className='block text-xs text-ink/45'>
                        {cv
                          ? `${(cv.size / 1024 / 1024).toFixed(
                              2
                            )} MB · click to replace`
                          : 'PDF, DOC, or DOCX — up to 5MB'}
                      </span>
                    </span>
                  </button>
                  <input
                    ref={fileRef}
                    type='file'
                    accept={ACCEPTED.join(',')}
                    className='sr-only'
                    onChange={(e) => pickFile(e.target.files?.[0])}
                  />
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='btn-primary group w-full !py-3.5'
                >
                  {loading ? 'Submitting…' : 'Submit application'}
                  {!loading && <LuArrowRight className='btn-arrow h-4 w-4' />}
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ApplyForm;
