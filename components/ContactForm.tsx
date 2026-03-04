'use client';

import { useState, type FormEvent } from 'react';
import { z } from 'zod';

const PROJECT_TYPES = [
  'New Build',
  'Remodel',
  'Addition',
  'Other',
] as const;

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be under 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^$|^\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  projectType: z
    .string()
    .optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be under 5,000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    honeypot: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (name in fieldErrors) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return false;
    }
    setFieldErrors({});
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) return;

    if (!validateForm()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: '',
          honeypot: '',
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-[#b87333]/30 bg-[#b87333]/5 px-8 py-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-[#b87333]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 font-playfair text-2xl font-bold text-[#f5f0e8]">
          Message Sent
        </h3>
        <p className="mt-2 text-[#f5f0e8]/60">
          Thank you for reaching out. We will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 rounded-sm border border-[#b87333] px-6 py-2 text-sm font-medium text-[#b87333] transition-all duration-300 hover:bg-[#b87333] hover:text-white"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot hidden field */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="honeypot">Do not fill this out</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium uppercase tracking-wider text-[#f5f0e8]/80"
        >
          Full Name <span className="text-[#b87333]">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          className={`mt-2 block w-full rounded-sm border bg-[#2a2a2a] px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/30 transition-colors focus:outline-none focus:ring-1 ${
            fieldErrors.name
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-white/10 focus:border-[#b87333] focus:ring-[#b87333]'
          }`}
          placeholder="Your full name"
        />
        {fieldErrors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-red-400" role="alert">
            {fieldErrors.name}
          </p>
        )}
      </div>

      {/* Email + Phone row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium uppercase tracking-wider text-[#f5f0e8]/80"
          >
            Email <span className="text-[#b87333]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className={`mt-2 block w-full rounded-sm border bg-[#2a2a2a] px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/30 transition-colors focus:outline-none focus:ring-1 ${
              fieldErrors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-white/10 focus:border-[#b87333] focus:ring-[#b87333]'
            }`}
            placeholder="your@email.com"
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium uppercase tracking-wider text-[#f5f0e8]/80"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
            className={`mt-2 block w-full rounded-sm border bg-[#2a2a2a] px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/30 transition-colors focus:outline-none focus:ring-1 ${
              fieldErrors.phone
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-white/10 focus:border-[#b87333] focus:ring-[#b87333]'
            }`}
            placeholder="(830) 555-0000"
          />
          {fieldErrors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-red-400" role="alert">
              {fieldErrors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Project Type */}
      <div>
        <label
          htmlFor="projectType"
          className="block text-sm font-medium uppercase tracking-wider text-[#f5f0e8]/80"
        >
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="mt-2 block w-full rounded-sm border border-white/10 bg-[#2a2a2a] px-4 py-3 text-[#f5f0e8] transition-colors focus:border-[#b87333] focus:outline-none focus:ring-1 focus:ring-[#b87333]"
        >
          <option value="">Select a project type</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium uppercase tracking-wider text-[#f5f0e8]/80"
        >
          Message <span className="text-[#b87333]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          className={`mt-2 block w-full resize-y rounded-sm border bg-[#2a2a2a] px-4 py-3 text-[#f5f0e8] placeholder-[#f5f0e8]/30 transition-colors focus:outline-none focus:ring-1 ${
            fieldErrors.message
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-white/10 focus:border-[#b87333] focus:ring-[#b87333]'
          }`}
          placeholder="Tell us about your dream home..."
        />
        {fieldErrors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400" role="alert">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Turnstile widget placeholder */}
      <div
        className="cf-turnstile"
        data-sitekey="YOUR_TURNSTILE_SITE_KEY"
        data-theme="dark"
        aria-label="Security verification"
      />

      {/* Error message */}
      {status === 'error' && (
        <div
          className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#b87333] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#d4956a] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'submitting' ? (
          <>
            {/* Loading spinner */}
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
