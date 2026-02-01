import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, FileText, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

const Contact = () => {
    // Social links - Update these with your actual links
    const socialLinks = [
        { name: 'GitHub', icon: <Github size={24} />, url: 'https://github.com/hanesh16', ariaLabel: 'View my GitHub profile', color: 'hover:text-cosmic-amber' },
        { name: 'LinkedIn', icon: <Linkedin size={24} />, url: 'https://linkedin.com/in/haneshkoganti', ariaLabel: 'Connect on LinkedIn', color: 'hover:text-cosmic-cyan' },
        { name: 'Twitter', icon: <Twitter size={24} />, url: 'https://twitter.com/haneshkoganti', ariaLabel: 'Follow me on Twitter', color: 'hover:text-cosmic-violet' },
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
                    {/* Background glow effects */}
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-cosmic-amber/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cosmic-violet/5 rounded-full blur-[100px]"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="text-cosmic-amber" size={16} />
                            <p className="text-cosmic-amber font-mono">05. What's Next?</p>
                            <Sparkles className="text-cosmic-amber" size={16} />
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent">
                            Get In Touch
                        </h2>
                        
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                            I'm always open to discussing new opportunities, interesting projects, or just having a friendly conversation about technology. Feel free to reach out!
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                            <a
                                href="mailto:haneshkoganti@gmail.com"
                                className="launch-btn inline-flex items-center gap-2 group"
                                aria-label="Send me an email"
                            >
                                <Mail size={18} className="group-hover:animate-bounce" />
                                Say Hello
                            </a>
                            <a
                                href="/Hanesh_Koganti_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 rounded-lg font-semibold hover:border-cosmic-violet hover:text-cosmic-violet hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-300 group"
                                aria-label="Download my resume"
                            >
                                <FileText size={18} className="group-hover:rotate-12 transition-transform" />
                                Resume
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center justify-center gap-8">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-slate-400 ${social.color} transform hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300`}
                                    aria-label={social.ariaLabel}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        
                        {/* Footer text */}
                        <p className="mt-12 text-slate-500 text-sm font-mono">
                            Designed & Built by Hanesh Koganti
                        </p>
                    </div>
                </TiltCard>
            </motion.div>
        </section>
    );
};

export default Contact;
