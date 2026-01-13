import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="py-24 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto px-6 relative z-10"
            >
                <div className="holo-glass p-12 rounded-2xl text-center relative overflow-hidden">
                    {/* Liquid Background Layer */}
                    <div className="absolute inset-0 z-0 liquid-bg opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)' }}>
                    </div>

                    <div className="relative z-10">
                        <p className="text-amber-400 font-mono mb-4">03. What's Next?</p>
                        <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 text-slate-100">Get In Touch</h2>
                        <p className="text-slate-300 text-lg mb-12 leading-relaxed">
                            Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>
                        <a
                            href="mailto:hello@example.com"
                            className="launch-btn inline-block"
                        >
                            Initiate Contact protocol
                        </a>
                    </div>
                </div>
            </motion.div>
        </section >
    );
};

export default Contact;
