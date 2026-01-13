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
        <section id="experience" className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 mb-12"
                >
                    <Briefcase className="text-amber-400" size={24} />
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit text-slate-100">Mission Log</h2>
                    <div className="h-[1px] bg-slate-700 flex-grow ml-4 max-w-xs"></div>
                </motion.div>

                <div className="relative border-l-2 border-slate-800 ml-3 md:ml-6 space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-400"></div>
                            <div className="absolute left-[-5px] top-[4px] w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>

                            <TiltCard index={index}>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-100">{exp.role}</h3>
                                        <p className="text-amber-400 font-medium text-lg">{exp.company}</p>
                                    </div>
                                    <div className="text-slate-400 font-mono text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10 w-fit">
                                        {exp.period} | {exp.location}
                                    </div>
                                </div>

                                <ul className="space-y-2">
                                    {exp.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start text-slate-300 text-sm md:text-base leading-relaxed">
                                            <span className="text-amber-400 mr-2 mt-1.5">▹</span>
                                            {point}
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
