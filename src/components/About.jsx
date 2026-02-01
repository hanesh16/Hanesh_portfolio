import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import polaroidImg from '../assets/polaroid_placeholder.png';

const About = () => {
    // Skills data
    const skills = [
        "Python", "Java", "C#", "SQL",
        "React", "Node.js", "TypeScript", "AWS/Azure/GCP",
        "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
        "PyTorch", "TensorFlow", "Flask", "Django"
    ];

    return (
        <section id="about" className="pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="w-full"
                >
                    <TiltCard className="h-full" variant="scifi">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-cosmic-amber font-bold text-lg font-mono">01.</span>
                                <h2 className="text-3xl md:text-4xl font-bold font-outfit bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">About Me</h2>
                                <div className="h-[1px] bg-gradient-to-r from-cosmic-amber/50 to-transparent flex-grow ml-4"></div>
                            </div>

                            <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                I'm a Master's graduate in Computer Science from Portland State University with over a year of industry experience. I love solving complex backend challenges and building scalable systems.
                            </p>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                My expertise spans across full-stack development, cloud computing (AWS, Azure, GCP), and AI/ML. I'm passionate about automation, optimizing performance, and creating intuitive digital experiences.
                            </p>

                            <p className="mb-4 text-slate-200 font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 bg-cosmic-violet rounded-full shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
                                Tech Arsenal:
                            </p>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {skills.map((skill) => (
                                    <li key={skill} className="flex items-center text-slate-400 text-sm font-mono group">
                                        <span className="text-cosmic-amber mr-2 group-hover:translate-x-1 transition-transform">▹</span>
                                        <span className="group-hover:text-slate-200 transition-colors">{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* Right: Image/Visual */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    <div className="relative z-10 w-full max-w-sm mx-auto md:ml-auto">
                        {/* Profile Image */}
                        <div className="aspect-square bg-slate-900 border-2 border-cosmic-amber/30 shadow-xl rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500 rotate-3 group-hover:rotate-0 group-hover:border-cosmic-amber/50 group-hover:shadow-[0_0_40px_rgba(251,191,36,0.2)]">
                            <img
                                src={polaroidImg}
                                alt="Hanesh Koganti - Software Engineer"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                decoding="async"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-violet/20 via-cosmic-amber/10 to-transparent group-hover:bg-transparent transition-all duration-300"></div>
                        </div>
                        {/* Border effect */}
                        <div className="absolute top-5 left-5 w-full h-full border-4 border-cosmic-violet/20 rounded-2xl -z-10 group-hover:top-3 group-hover:left-3 group-hover:border-cosmic-violet/30 transition-all duration-300"></div>
                        
                        {/* Floating decorative elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-cosmic-cyan/40 rounded-tr-lg"></div>
                        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-cosmic-amber/40 rounded-bl-lg"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
