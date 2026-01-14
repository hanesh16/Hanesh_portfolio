import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

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
                <TiltCard className="h-full relative overflow-hidden text-center p-12" variant="scifi-tech">
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
                </TiltCard>
            </motion.div>
        </section >
    );
};

export default Contact;
