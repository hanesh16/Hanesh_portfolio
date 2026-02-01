import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import TiltCard from './TiltCard';

const Experience = () => {
    const experiences = [
        {
            company: "Comcast",
            location: "Sunnyvale, WA",
            role: "Software Development Engineer",
            period: "Oct. 2023 - Current",
            points: [
                "Developed and maintained backend services and RESTful APIs using Python, Flask, and SQL, improving response times by 30% and ensuring reliable data flow across core application modules.",
                "Automated routine system tasks and data validation workflows with Python and Linux shell scripts, reducing manual effort and improving operational efficiency.",
                "Collaborated with cross-functional teams to design, implement, and deploy microservices, improving system scalability, simplifying deployments, and reducing service outages during peak usage.",
                "Implemented thorough unit, integration, and regression tests using PyTest and CI/CD pipelines, increasing code stability, preventing regression issues, and lowering production defects."
            ]
        }
    ];

    return (
        <section id="experience" className="pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-12"
                >
                    <div className="p-2 rounded-lg bg-cosmic-amber/10 border border-cosmic-amber/20">
                        <Briefcase className="text-cosmic-amber" size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Mission Log</h2>
                    <div className="h-[1px] bg-gradient-to-r from-cosmic-violet/50 to-transparent flex-grow ml-4 max-w-xs"></div>
                </motion.div>

                <div className="relative ml-3 md:ml-6 space-y-12">
                    {/* Enhanced Timeline Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cosmic-amber/50 via-cosmic-violet/30 to-transparent"></div>
                    
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot with glow */}
                            <div className="absolute left-[-5px] top-0 w-3 h-3 rounded-full bg-slate-900 border-2 border-cosmic-amber shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
                            <div className="absolute left-[-3px] top-[2px] w-1.5 h-1.5 rounded-full bg-cosmic-amber animate-pulse"></div>

                            <TiltCard index={index} variant="scifi">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">{exp.role}</h3>
                                        <p className="text-cosmic-amber font-medium text-lg">{exp.company}</p>
                                    </div>
                                    <div className="text-slate-400 font-mono text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10 w-fit backdrop-blur-sm">
                                        <span className="text-cosmic-violet">{exp.period}</span>
                                        <span className="mx-2 text-slate-600">|</span>
                                        <span>{exp.location}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    {exp.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start text-slate-300 text-sm md:text-base leading-relaxed group">
                                            <span className="text-cosmic-violet mr-3 mt-1.5 group-hover:text-cosmic-cyan transition-colors">▹</span>
                                            <span className="group-hover:text-slate-200 transition-colors">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
