import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, CheckCircle, Loader2 } from 'lucide-react';

const ContactLink = ({ href, icon: Icon, label, value }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.02, x: 4 }}
    className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/20 hover:bg-white/5 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
      <Icon size={22} className="text-amber-500/80" />
    </div>
    <div>
      <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-white/90 font-medium">{value}</p>
    </div>
  </motion.a>
);

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/hanesh16", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/hk6", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <section id="contact" className="section-full relative">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <div className="flex items-center gap-3">
            <span className="text-amber-500/70 font-mono text-sm">05</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white/90">
              Contact
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <ContactLink
              href="mailto:haneshk16@gmail.com"
              icon={Mail}
              label="Email"
              value="haneshk16@gmail.com"
            />
            <ContactLink
              href="#"
              icon={Phone}
              label="Phone"
              value="602-451-3727"
            />
            <ContactLink
              href="#"
              icon={MapPin}
              label="Location"
              value="Sunnyvale, CA"
            />

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-4">Follow Me</p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-amber-500/80 hover:border-amber-500/20 transition-all"
                  >
                    <Icon size={22} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5">
              <div className="relative space-y-6">
                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-slate-500 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="focus-glow w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-slate-500 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="focus-glow w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-mono text-slate-500 uppercase tracking-wider">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="focus-glow w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${isSubmitted
                    ? 'bg-green-500/20 text-green-400/80 border border-green-500/30'
                    : 'premium-button'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
