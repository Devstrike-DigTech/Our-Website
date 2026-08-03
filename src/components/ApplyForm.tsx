'use client';

import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineClose } from 'react-icons/ai';
import { API_URL } from '@/lib/api';

interface ApplyFormProps {
  vacancyId: string;
  vacancyTitle: string;
}

/** "Apply for Job" button + modal form with CV upload. */
const ApplyForm: React.FC<ApplyFormProps> = ({ vacancyId, vacancyTitle }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', coverNote: '' });
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cv = fileRef.current?.files?.[0];
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
      if (fileRef.current) fileRef.current.value = '';
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    'w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:outline-none';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-brand-gradient-b px-6 py-3 font-bold text-white shadow-md transition-opacity hover:opacity-90"
      >
        Apply for Job
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-start justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Apply — {vacancyTitle}
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <AiOutlineClose className="text-xl" />
              </button>
            </div>
            <p className="mb-6 text-sm text-gray-500">
              Tell us about yourself and attach your CV.
            </p>

            <form onSubmit={submit} className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClasses}
                required
              />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClasses}
                required
              />
              <textarea
                placeholder="Cover note (optional)"
                value={form.coverNote}
                onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                className={`${inputClasses} min-h-[110px]`}
              />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  CV (PDF, DOC, or DOCX — max 5MB)
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-brand-gradient-b px-6 py-3 font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyForm;
