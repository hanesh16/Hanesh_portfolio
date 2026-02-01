import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
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
        <section id="education" className="pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-12"
                >
                    <div className="p-2 rounded-lg bg-cosmic-violet/10 border border-cosmic-violet/20">
                        <GraduationCap className="text-cosmic-violet" size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Training Academy</h2>
                    <div className="h-[1px] bg-gradient-to-r from-cosmic-amber/50 to-transparent flex-grow ml-4 max-w-xs"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {education.map((edu, index) => (
                        <div key={index} className="h-full">
                            <TiltCard index={index} className="h-full" variant="scifi">
                                <div className="h-full flex flex-col">
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-2 gap-4">
                                            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">{edu.school}</h3>
                                            <span className="text-xs font-mono text-cosmic-cyan bg-cosmic-cyan/10 px-3 py-1 rounded-full border border-cosmic-cyan/20 whitespace-nowrap">{edu.period}</span>
                                        </div>
                                        <p className="text-cosmic-amber font-medium">{edu.degree}</p>
                                    </div>

                                    <div className="mt-auto">
                                        <h4 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-cosmic-violet rounded-full shadow-[0_0_6px_rgba(139,92,246,0.8)]"></span>
                                            Coursework
                                        </h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {edu.coursework}
                                        </p>
                                    </div>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>

                <TiltCard className="border-l-4 border-cosmic-amber" variant="scifi">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-cosmic-amber/10">
                            <Award className="text-cosmic-amber" size={20} />
                        </div>
                        <h3 className="text-lg font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Certifications</h3>
                    </div>
                    <ul className="space-y-3">
                        {certifications.map((cert, index) => (
                            <li key={index} className="text-slate-300 flex items-start group">
                                <span className="text-cosmic-violet mr-3 group-hover:text-cosmic-cyan transition-colors">✦</span>
                                <span className="group-hover:text-slate-200 transition-colors">{cert}</span>
                            </li>
                        ))}
                    </ul>
                </TiltCard>
            </div>
        </section>
    );
};

export default Education;
