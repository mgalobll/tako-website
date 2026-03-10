'use client';

import { FormEvent, useState } from 'react';
import { submitContactForm } from '@/lib/api';
import type { Dictionary } from '@/config/locales';

type Props = {
  t: Dictionary;
};

const initialValues = { name: '', email: '', phone: '', message: '' };

export default function ContactForm({ t }: Props) {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await submitContactForm(values);
      setValues(initialValues);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : t.contact.error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6" noValidate>
      <label className="block text-sm font-medium">
        {t.contact.name}
        <input
          required
          value={values.name}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
          className="mt-1 w-full rounded-md border border-accent/30 bg-white px-3 py-2"
        />
      </label>
      <label className="block text-sm font-medium">
        {t.contact.email}
        <input
          required
          type="email"
          value={values.email}
          onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
          className="mt-1 w-full rounded-md border border-accent/30 bg-white px-3 py-2"
        />
      </label>
      <label className="block text-sm font-medium">
        {t.contact.phone}
        <input
          required
          value={values.phone}
          onChange={(e) => setValues((prev) => ({ ...prev, phone: e.target.value }))}
          className="mt-1 w-full rounded-md border border-accent/30 bg-white px-3 py-2"
        />
      </label>
      <label className="block text-sm font-medium">
        {t.contact.message}
        <textarea
          required
          rows={5}
          value={values.message}
          onChange={(e) => setValues((prev) => ({ ...prev, message: e.target.value }))}
          className="mt-1 w-full rounded-md border border-accent/30 bg-white px-3 py-2"
        />
      </label>

      <button
        disabled={status === 'submitting'}
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
        type="submit"
      >
        {status === 'submitting' ? '...' : t.contact.submit}
      </button>

      {status === 'success' && <p className="text-sm text-green-700">{t.contact.success}</p>}
      {status === 'error' && <p className="text-sm text-red-700">{errorMessage}</p>}
    </form>
  );
}
