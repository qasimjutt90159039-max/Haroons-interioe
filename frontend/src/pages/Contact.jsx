import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, MapPin, MessageSquare, ArrowUpRight, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

const servicesOptions = [
  'Residential Interiors',
  'Commercial Interiors',
  'Space Planning',
  'Interior Styling',
  'Wall & Surface Design',
  'Custom Interior Solutions',
  'Full Villa Interior Architecture',
  'General Spatial Consultation',
];

const projectTypeOptions = [
  'New Construction Interior',
  'Full Villa / Residence Renovation',
  'Individual Room (Living / Master Bed)',
  'Corporate Office / Commercial Space',
  'Boutique / Retail Space',
  'Other Custom Project',
];

const budgetOptions = [
  'Under PKR 3 Million',
  'PKR 3M – 7M',
  'PKR 7M – 15M',
  'PKR 15M – 30M+',
  'To Be Discussed / Flexible',
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const preselectedRef = searchParams.get('ref') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselectedService || 'Residential Interiors',
    projectType: 'Full Villa / Residence Renovation',
    budget: 'To Be Discussed / Flexible',
    message: preselectedRef ? `Inquiring regarding reference project: "${preselectedRef}". ` : '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
    if (preselectedRef) {
      setFormData((prev) => ({
        ...prev,
        message: `Inquiring regarding reference project: "${preselectedRef}". `,
      }));
    }
  }, [preselectedService, preselectedRef]);

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    }
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }
    if (!formData.service.trim()) {
      errs.service = 'Please select a required service.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details about your project or space.';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setResponseMessage('');

    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setSubmitStatus('success');
        setResponseMessage(
          res.message ||
            'Thank you. Your project request has been submitted. Haroon\'s Interiors will contact you shortly.'
        );
        // Reset form upon successful submission
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: 'Residential Interiors',
          projectType: 'Full Villa / Residence Renovation',
          budget: 'To Be Discussed / Flexible',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setResponseMessage(res.message || 'Submission failed. Please verify your entries.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmitStatus('error');
      setResponseMessage(
        err.message || 'Unable to submit your request at this time. Please call us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-studio-black text-studio-soft pt-32 pb-24 selection:bg-studio-gold selection:text-studio-black">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-studio-gold" />
          <span className="text-xs uppercase tracking-widestEditorial text-studio-gold font-mono">
            DIRECT ENGAGEMENT
          </span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-editorial font-normal text-white max-w-4xl tracking-tight leading-tight">
          Initiate Your <br />
          <span className="italic font-light text-studio-gold">Spatial Project.</span>
        </h1>
        <p className="text-studio-light/80 text-base sm:text-lg font-light max-w-2xl mt-6 leading-relaxed">
          Reach out to discuss your residence, office, or spatial remodeling. Our studio is based in Ichhra on Ferozpur Road, Lahore.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Business Information & Quick Triggers */}
          <div className="lg:col-span-5 space-y-10">
            {/* Studio Identity Card */}
            <div className="p-8 border border-studio-borderSubtle bg-studio-deep space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-studio-gold block mb-1">
                  INTERIOR DESIGNER
                </span>
                <h2 className="text-2xl sm:text-3xl font-editorial text-white uppercase">
                  Haroon's Interiors
                </h2>
              </div>

              {/* Direct Phone */}
              <div className="pt-4 border-t border-studio-borderSubtle space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-studio-medium block">
                  Studio Phone
                </span>
                <a
                  href="tel:+923227535688"
                  className="text-lg sm:text-xl font-medium text-white hover:text-studio-gold transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-studio-gold" />
                  <span>+92 322 7535688</span>
                </a>
              </div>

              {/* Direct WhatsApp */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-studio-medium block">
                  Instant Messaging
                </span>
                <a
                  href="https://wa.me/923227535688"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-studio-gold hover:text-white transition-colors inline-flex items-center gap-2 font-medium"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message on WhatsApp (+92 322 7535688)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Address */}
              <div className="pt-4 border-t border-studio-borderSubtle space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-studio-medium block">
                  Physical Studio Address
                </span>
                <div className="flex items-start gap-3 text-sm text-studio-light/90 font-light leading-relaxed">
                  <MapPin className="w-4 h-4 text-studio-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-white">G8JC+4HH, Samars Plaza</p>
                    <p>Ferozpur Rd, Shah Jamal More, Ichhra</p>
                    <p>Ichhra Lahore, 54600, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="pt-4 border-t border-studio-borderSubtle flex items-center gap-3 text-xs text-studio-medium font-light">
                <Clock className="w-4 h-4 text-studio-gold shrink-0" />
                <p>Monday – Saturday: Consultations by appointment</p>
              </div>
            </div>

            {/* Quality Commitment Box */}
            <div className="p-6 border border-studio-borderSubtle bg-studio-charcoal/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-studio-gold shrink-0 mt-0.5" />
              <div className="text-xs text-studio-medium leading-relaxed font-light">
                <strong className="text-white block font-medium mb-1">Direct Principal Attention</strong>
                Every inquiry receives personalized review. We maintain strict design confidentiality and direct communication from concept to completion.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 border border-studio-borderSubtle bg-studio-deep relative">
              <h2 className="text-2xl sm:text-3xl font-editorial text-white mb-2">
                Project Inquiry Form
              </h2>
              <p className="text-xs sm:text-sm text-studio-medium font-light mb-8">
                Provide your project parameters below to arrange an initial architectural dialogue.
              </p>

              {/* Success Notification */}
              {submitStatus === 'success' && (
                <div className="mb-8 p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p>{responseMessage}</p>
                </div>
              )}

              {/* Error Notification */}
              {submitStatus === 'error' && (
                <div className="mb-8 p-4 bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <p>{responseMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-studio-light mb-2">
                      Full Name <span className="text-studio-gold">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Tariq Mehmood"
                      className={`w-full px-4 py-3 bg-studio-black border text-sm text-white focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-studio-borderSubtle focus:border-studio-gold'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-rose-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-studio-light mb-2">
                      Phone Number <span className="text-studio-gold">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +92 300 1234567"
                      className={`w-full px-4 py-3 bg-studio-black border text-sm text-white focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-studio-borderSubtle focus:border-studio-gold'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-rose-400 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-studio-light mb-2">
                      Email Address <span className="text-studio-medium text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. tariq@domain.com"
                      className={`w-full px-4 py-3 bg-studio-black border text-sm text-white focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-studio-borderSubtle focus:border-studio-gold'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-rose-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-studio-light mb-2">
                      Service Required <span className="text-studio-gold">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-studio-black border border-studio-borderSubtle text-sm text-white focus:outline-none focus:border-studio-gold transition-colors"
                    >
                      {servicesOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Project Type & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-studio-light mb-2">
                      Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-studio-black border border-studio-borderSubtle text-sm text-white focus:outline-none focus:border-studio-gold transition-colors"
                    >
                      {projectTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-studio-light mb-2">
                      Budget Expectation
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-studio-black border border-studio-borderSubtle text-sm text-white focus:outline-none focus:border-studio-gold transition-colors"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-studio-light mb-2">
                    Project Message / Scope Description <span className="text-studio-gold">*</span>
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the space: size (e.g. 1-Kanal / 10-Marla), location in Lahore, current stage, and your aesthetic goals..."
                    className={`w-full px-4 py-3 bg-studio-black border text-sm text-white focus:outline-none transition-colors ${
                      errors.message
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-studio-borderSubtle focus:border-studio-gold'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-rose-400 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-studio-black font-semibold text-xs uppercase tracking-widest hover:bg-studio-gold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <span>{isSubmitting ? 'TRANSMITTING REQUEST...' : 'SEND PROJECT REQUEST'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Location Map Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-24">
        <div className="border border-studio-borderSubtle overflow-hidden bg-studio-deep">
          <div className="p-6 border-b border-studio-borderSubtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-studio-gold block">
                PHYSICAL LOCATION
              </span>
              <h3 className="text-lg font-editorial text-white">
                Ichhra, Ferozpur Road, Lahore
              </h3>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Samars+Plaza+Ferozpur+Rd+Shah+Jamal+More+Ichhra+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-widest text-studio-gold hover:underline inline-flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Google Maps Embed for Samars Plaza, Ferozpur Road, Ichhra, Lahore */}
          <div className="w-full h-80 sm:h-96 relative bg-studio-charcoal">
            <iframe
              title="Haroon's Interiors Studio Location"
              src="https://maps.google.com/maps?q=Samars%20Plaza%20Ferozpur%20Rd%20Ichhra%20Lahore&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-80"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}
