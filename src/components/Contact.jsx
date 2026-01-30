import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, FileText } from 'lucide-react';
import TiltCard from './TiltCard';

const Contact = () => {
    // Social links - Update these with your actual links
    const socialLinks = [
        { name: 'GitHub', icon: <Github size={24} />, url: 'https://github.com/hanesh16', ariaLabel: 'View my GitHub profile' },
        { name: 'LinkedIn', icon: <Linkedin size={24} />, url: 'https://linkedin.com/in/haneshkoganti', ariaLabel: 'Connect on LinkedIn' },
        { name: 'Twitter', icon: <Twitter size={24} />, url: 'https://twitter.com/haneshkoganti', ariaLabel: 'Follow me on Twitter' },
    ];

    return (
        <section id="contact" className="pt-24 pb-24 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto px-6 relative z-10"
            >
                <TiltCard className="h-full relative overflow-hidden text-center p-12" variant="scifi-tech">
                    <div className="relative z-10">
                        <p className="text-amber-400 font-mono mb-4">05. What's Next?</p>
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 text-slate-100">Get In Touch</h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                            I'm always open to discussing new opportunities, interesting projects, or just having a friendly conversation about technology. Feel free to reach out!
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                            <a
                                href="mailto:haneshkoganti@gmail.com"
                                className="launch-btn inline-flex items-center gap-2"
                                aria-label="Send me an email"
                            >
                                <Mail size={18} />
                                Say Hello
                            </a>
                            <a
                                href="/Hanesh_Koganti_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 rounded-md font-semibold hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
                                aria-label="Download my resume"
                            >
                                <FileText size={18} />
                                Resume
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center justify-center gap-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-amber-400 transform hover:-translate-y-1 transition-all duration-300"
                                    aria-label={social.ariaLabel}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </TiltCard>
            </motion.div>
        </section>
    );
};

export default Contact;
