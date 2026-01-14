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
        <section id="about" className="py-20 text-slate-900">
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
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-amber-400 font-bold text-lg">01.</span>
                                <h2 className="text-3xl md:text-4xl font-bold font-outfit text-slate-100">About Me</h2>
                                <div className="h-[1px] bg-slate-700 flex-grow ml-4"></div>
                            </div>

                            <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                I'm a Master's graduate in Computer Science from Portland State University with over a year of industry experience. I love solving complex backend challenges and building scalable systems.
                            </p>
                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                My expertise spans across full-stack development, cloud computing (AWS, Azure, GCP), and AI/ML. I'm passionate about automation, optimizing performance, and creating intuitive digital experiences.
                            </p>

                            <p className="mb-4 text-slate-200 font-semibold">Tech Arsenal:</p>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {skills.map((skill) => (
                                    <li key={skill} className="flex items-center text-slate-400 text-sm font-mono">
                                        <span className="text-amber-400 mr-2">▹</span> {skill}
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
                        {/* Profile Image (Moved from Hero) */}
                        <div className="aspect-square bg-slate-900 border-2 border-amber-400/30 shadow-xl rounded-2xl overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-300 rotate-3 group-hover:rotate-0">
                            <img
                                src={polaroidImg}
                                alt="Hanesh Koganti Profile"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-amber-400/10 group-hover:bg-transparent transition-all duration-300"></div>
                        </div>
                        {/* Border effect */}
                        <div className="absolute top-5 left-5 w-full h-full border-4 border-amber-400/20 rounded-2xl -z-10 group-hover:top-3 group-hover:left-3 transition-all duration-300"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
