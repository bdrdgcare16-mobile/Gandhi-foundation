import { useState } from 'react';
import PageHero from '../components/PageHero';

const TOPICS = [
  'CSR / Institutional Partnership',
  'Volunteer',
  'Program Support',
  'Donation',
  'General Enquiry',
];

const EMPTY = { name: '', organisation: '', email: '', phone: '', topic: '', message: '', website: '' };

// Mirrors the server's rules so people get an answer without a round trip.
// The server revalidates regardless — this is convenience, not security.
function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = 'Please enter your name.';

  if (!form.email.trim()) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.';

  if (!form.phone) errors.phone = 'Please enter your phone number.';
  else if (!/^\d{10}$/.test(form.phone)) errors.phone = 'Phone number must be exactly 10 digits.';

  if (!form.topic) errors.topic = 'Please choose how you would like to connect.';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [feedback, setFeedback] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const update = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  // Digits only, hard-capped at 10 — typing an 11th character does nothing.
  // Paste is handled too: a pasted "+91 98765 43210" arrives as 12 digits, so
  // the country code is dropped rather than the last two digits being cut off.
  const updatePhone = e => {
    let d = e.target.value.replace(/\D/g, '');
    if (d.length > 10 && d.startsWith('91')) d = d.slice(2);
    if (d.length > 10 && d.startsWith('0')) d = d.slice(1);
    setForm(f => ({ ...f, phone: d.slice(0, 10) }));
  };

  async function submit(e) {
    e.preventDefault();
    if (status === 'sending') return;

    const errors = validate(form);
    if (Object.keys(errors).length) {
      setStatus('error');
      setFieldErrors(errors);
      setFeedback('Please correct the highlighted fields.');
      return;
    }

    setStatus('sending');
    setFeedback('');
    setFieldErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setFeedback(data.error || 'Your enquiry could not be sent. Please try again.');
        if (Array.isArray(data.details)) {
          setFieldErrors(Object.fromEntries(data.details.map(d => [d.field, d.message])));
        }
        return;
      }

      setStatus('sent');
      setFeedback(data.message || 'Thank you. Your enquiry has been received.');
      setForm(EMPTY);
    } catch {
      setStatus('error');
      setFeedback('We could not reach the server. Please check your connection and try again.');
    }
  }

  const err = key => fieldErrors[key] && <small className="field-error">{fieldErrors[key]}</small>;

  return <>
    <PageHero image="/assets/contact-hero.jpg" eyebrow="Contact & Partnerships" title="Start a conversation with Gandhi Foundation." text="For CSR collaboration, volunteering, institutional support, program partnerships or general enquiries."/>
    <section className="section"><div className="container contact-grid">
      <div className="section-heading">
        <span className="eyebrow">Connect</span>
        <h2>Work with communities through meaningful partnership.</h2>
        <div className="contact-facts">
          <div><span>Location</span><strong>Tiruvallur District, Tamil Nadu, India</strong></div>
          <div><span>Organisation</span><strong>Gandhi Foundation</strong></div>
          <div><span>Before launch</span><strong>Add verified phone, email and full official address</strong></div>
        </div>
      </div>

      <form className="contact-form" onSubmit={submit} noValidate>
        <p className="required-note">Fields marked <b className="req">*</b> are required.</p>
        <div className="field-row">
          <label>Name <b className="req" aria-hidden="true">*</b><input required value={form.name} onChange={update('name')} placeholder="Your name" autoComplete="name"/>{err('name')}</label>
          <label>Organisation<input value={form.organisation} onChange={update('organisation')} placeholder="Company / NGO / Institution" autoComplete="organization"/>{err('organisation')}</label>
        </div>
        <div className="field-row">
          <label>Email <b className="req" aria-hidden="true">*</b><input required type="email" value={form.email} onChange={update('email')} placeholder="name@example.com" autoComplete="email"/>{err('email')}</label>
          <label>Phone <b className="req" aria-hidden="true">*</b><input required type="tel" inputMode="numeric" maxLength={10} pattern="\\d{10}" value={form.phone} onChange={updatePhone} placeholder="10-digit mobile number" autoComplete="tel"/>{err('phone')}</label>
        </div>
        <label>How would you like to connect? <b className="req" aria-hidden="true">*</b>
          <select required value={form.topic} onChange={update('topic')}>
            <option value="" disabled>Select an option</option>
            {TOPICS.map(t => <option key={t}>{t}</option>)}
          </select>
          {err('topic')}
        </label>
        <label>Message
          <textarea rows="5" value={form.message} onChange={update('message')} placeholder="Tell us how you would like to work with Gandhi Foundation"></textarea>
          {err('message')}
        </label>

        {/* Honeypot: hidden from people, filled in by bots. */}
        <input className="hp-field" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={update('website')}/>

        <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
        </button>

        <p className={`form-note ${status === 'sent' ? 'success' : ''} ${status === 'error' ? 'error' : ''}`} role="status" aria-live="polite">
          {feedback || 'We usually respond within a few working days.'}
        </p>
      </form>
    </div></section>
  </>;
}