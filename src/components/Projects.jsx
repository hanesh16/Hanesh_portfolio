import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import TiltCard from './TiltCard';


const Projects = () => {
    const projects = [
        {
            title: "Spend Analyzer",
            description: "Built a Flask-based web app for automated expense tracking, using Google Cloud (BigQuery, OAuth2) and Azure Form Recognizer; improved expense tracking accuracy by 95%. Integrated secure authentication and SQL query-driven insights for real-time spending trend visualization.",
            tags: ["Python", "Flask", "Azure", "BigQuery", "Docker"],
            links: { github: "https://github.com/hanesh16", external: "#" }
        },
        {
            title: "Generative AI in Healthcare",
            description: "Compared and fine-tuned LLMs (RoBERTa, Gemma, Gemini Pro) for healthcare QA; boosted model precision from 54% to 75%, achieving 100% accuracy with Gemini Pro. Developed a healthcare chatbot using transformer models and PyTorch.",
            tags: ["LLMs", "Transformers", "PyTorch", "Python"],
            links: { github: "https://github.com/hanesh16", external: "#" }
        },
        {
            title: "University Inventory Management System",
            description: "Built an inventory system with TypeScript, GraphQL, and React; increased tracking efficiency by 25%. Containerized app with Docker and orchestrated microservices using Kubernetes. Automated API testing with Postman and SQS.",
            tags: ["TypeScript", "Docker", "GraphQL", "React", "K8s"],
            links: { github: "https://github.com/hanesh16", external: "#" }
        },
        {
            title: "PSU Events",
            description: "Developed a Django system for event and venue management with user role-based access and CRUD functionality for efficient administration.",
            tags: ["Django", "Python", "HTML/CSS", "PostgreSQL"],
            links: { github: "https://github.com/hanesh16", external: "#" }
        }
    ];

    return (
        <section id="projects" className="py-20 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 mb-12"
                >
                    <span className="text-amber-400 font-bold text-lg">02.</span>
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit text-slate-100 glow-text">Some Things I've Built</h2>
                    <div className="h-[1px] bg-slate-700 flex-grow ml-4 max-w-xs box-shadow-glow"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
                    {projects.map((project, index) => (
                        <TiltCard key={index} index={index} className="h-full" variant="scifi">
                            <div className="flex flex-col h-full">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="folder-icon text-amber-400 group-hover:text-amber-300 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                    </div>
                                    <div className="flex gap-4 text-slate-500 z-20">
                                        <a href={project.links.github} className="hover:text-amber-400 hover:scale-110 transition-all"><Github size={20} /></a>
                                        <a href={project.links.external} className="hover:text-amber-400 hover:scale-110 transition-all"><ExternalLink size={20} /></a>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2 text-slate-100 group-hover:text-amber-400 transition-colors drop-shadow-lg">{project.title}</h3>
                                <p className="text-slate-400 mb-6 text-sm leading-relaxed">{project.description}</p>

                                <ul className="flex flex-wrap gap-3 mt-auto">
                                    {project.tags.map(tag => (
                                        <li key={tag} className="text-xs font-mono text-amber-500/80 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
