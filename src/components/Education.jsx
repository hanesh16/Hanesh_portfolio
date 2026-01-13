import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import TiltCard from './TiltCard';

const Education = () => {
    const education = [
        {
            school: "Portland State University",
            degree: "Masters of Science in Computer Science",
            period: "Sept 2022 - Mar. 2024",
            coursework: "Algorithm Design Analysis, Software Engineering, Full Stack Web Development, Large Language Models, Operating System Foundations, Code Reading & Review, Inter Networking Protocols, Machine Learning, Artificial Intelligence, DataBase Management Systems, Virtual Reality."
        },
        {
            school: "SRM University, AP",
            degree: "B.Tech Computer Science and Engineering",
            period: "Jul 2018 - May. 2022",
            coursework: "Computer Organization and Architecture, Object Oriented Programming, Formal Languages and Automata Theory, Computer Networks, Introduction to DataScience, Big Data Analytics, Information Retrieval."
        }
    ];

    const certifications = [
        "Google Cloud Arcade Facilitator Program 2025 (Cohort 1) — Issued by Google Cloud"
    ];

    return (
        <section id="education" className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 mb-12"
                >
                    <GraduationCap className="text-amber-400" size={24} />
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit text-slate-100">Training Academy</h2>
                    <div className="h-[1px] bg-slate-700 flex-grow ml-4 max-w-xs"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {education.map((edu, index) => (
                        <div key={index} className="h-full">
                            <TiltCard index={index} className="h-full">
                                <div className="h-full flex flex-col">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-slate-100">{edu.school}</h3>
                                            <span className="text-xs font-mono text-slate-400 bg-white/5 px-2 py-1 rounded border border-white/10 whitespace-nowrap ml-2">{edu.period}</span>
                                        </div>
                                        <p className="text-amber-400 font-medium">{edu.degree}</p>
                                    </div>

                                    <div className="mt-auto">
                                        <h4 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">Coursework</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {edu.coursework}
                                        </p>
                                    </div>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>

                <TiltCard className="border-l-4 border-amber-400">
                    <h3 className="text-lg font-bold text-slate-100 mb-2">Certifications</h3>
                    <ul className="space-y-2">
                        {certifications.map((cert, index) => (
                            <li key={index} className="text-slate-300 flex items-center">
                                <span className="text-amber-400 mr-2">✦</span>
                                {cert}
                            </li>
                        ))}
                    </ul>
                </TiltCard>
            </div>
        </section>
    );
};

export default Education;
