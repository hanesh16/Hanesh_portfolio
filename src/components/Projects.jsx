import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "Spend Analyzer",
            description: "Built a Flask-based web app for automated expense tracking, using Google Cloud (BigQuery, OAuth2) and Azure Form Recognizer; improved expense tracking accuracy by 95%. Integrated secure authentication and SQL query-driven insights for real-time spending trend visualization.",
            tags: ["Python", "Flask", "Azure", "BigQuery", "Docker"],
            links: { github: "https://github.com/hanesh16", external: "#" },
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" // Dark Data Viz
        },
        {
            title: "Generative AI in Healthcare",
            description: "Compared and fine-tuned LLMs (RoBERTa, Gemma, Gemini Pro) for healthcare QA; boosted model precision from 54% to 75%, achieving 100% accuracy with Gemini Pro. Developed a healthcare chatbot using transformer models and PyTorch.",
            tags: ["LLMs", "Transformers", "PyTorch", "Python"],
            links: { github: "https://github.com/hanesh16", external: "#" },
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop" // Glowing AI Brain
        },
        {
            title: "University Inventory Management System",
            description: "Built an inventory system with TypeScript, GraphQL, and React; increased tracking efficiency by 25%. Containerized app with Docker and orchestrated microservices using Kubernetes. Automated API testing with Postman and SQS.",
            tags: ["TypeScript", "Docker", "GraphQL", "React", "K8s"],
            links: { github: "https://github.com/hanesh16", external: "#" },
            image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=2070&auto=format&fit=crop" // Sci-Fi Server/Inventory (Fixed)
        },
        {
            title: "PSU Events",
            description: "Developed a Django system for event and venue management with user role-based access and CRUD functionality for efficient administration.",
            tags: ["Django", "Python", "HTML/CSS", "PostgreSQL"],
            links: { github: "https://github.com/hanesh16", external: "#" },
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" // Digital Network (Chip)
        }
    ];

    return (
        <section id="projects" className="py-24 relative z-10">
            <div className="max-w-[1000px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-20"
                >
                    <span className="text-amber-400 font-bold text-xl font-mono">03.</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-outfit text-slate-100 glow-text">Some Things I've Built</h2>
                    <div className="h-[1px] bg-slate-700 flex-grow ml-4 max-w-xs box-shadow-glow"></div>
                </motion.div>

                <div className="flex flex-col gap-24 md:gap-32">
                    {projects.map((project, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="relative grid grid-cols-12 items-center gap-2"
                            >
                                {/* Project Image */}
                                <div
                                    className={`
                                        col-span-12 md:col-span-7 relative group 
                                        ${isEven ? 'md:col-start-1' : 'md:col-start-6'}
                                        row-span-1 md:row-start-1
                                    `}
                                >
                                    <a href={project.links.external || project.links.github} className="block w-full h-full relative z-10">
                                        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-slate-700/50 shadow-2xl transition-all duration-300">
                                            {/* Overlay Effect */}
                                            <div className="absolute inset-0 bg-neutral-900/40 group-hover:bg-transparent transition-all duration-300 z-20 mix-blend-multiply"></div>
                                            <div className="absolute inset-0 bg-black/80 group-hover:bg-transparent transition-all duration-300 z-10 pointer-events-none"></div>

                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 scale-100 group-hover:scale-105"
                                            />
                                        </div>
                                    </a>
                                </div>

                                {/* Project Content */}
                                <div
                                    className={`
                                        col-span-12 md:col-span-6 z-30 pointer-events-none md:pointer-events-auto
                                        relative md:pb-12
                                        ${isEven ? 'md:col-start-7 text-left md:text-right' : 'md:col-start-1 text-left md:text-left'}
                                        row-span-1 md:row-start-1
                                    `}
                                >
                                    <h4 className="text-amber-400 font-mono text-sm mb-2">Featured Project</h4>
                                    <h3 className="text-2xl font-bold text-slate-100 mb-6 hover:text-amber-400 transition-colors cursor-pointer inline-block">
                                        <a href={project.links.external || project.links.github}>{project.title}</a>
                                    </h3>

                                    <div
                                        className="p-6 md:p-8 rounded-none md:hover:scale-[1.02] transition-transform duration-300 group-card relative mb-6"
                                        style={{
                                            clipPath: "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)",
                                            backgroundColor: "rgba(0, 0, 0, 0.95)", // Pitch dark (almost opaque)
                                            backdropFilter: "blur(12px)",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                            backgroundImage: `
                                                radial-gradient(white, rgba(255, 255, 255, .2) 2px, transparent 3px),
                                                radial-gradient(white, rgba(255, 255, 255, .15) 1px, transparent 2px),
                                                radial-gradient(white, rgba(255, 255, 255, .1) 2px, transparent 3px)
                                            `,
                                            backgroundSize: "550px 550px, 350px 350px, 250px 250px",
                                            backgroundPosition: "0 0, 40px 60px, 130px 270px"
                                        }}
                                    >
                                        {/* Sci-Fi Decorative Elements */}
                                        <div className="absolute top-10 right-10 w-1 h-1 bg-white rounded-full animate-pulse z-0" style={{ boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.6)" }}></div>
                                        <div className="absolute bottom-20 left-10 w-[2px] h-[2px] bg-sky-200 rounded-full animate-pulse z-0" style={{ animationDelay: "1s", boxShadow: "0 0 8px 1px rgba(186, 230, 253, 0.6)" }}></div>
                                        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-amber-100 rounded-full animate-pulse z-0" style={{ animationDelay: "2s", boxShadow: "0 0 8px 1px rgba(254, 243, 199, 0.4)", opacity: 0.6 }}></div>

                                        {/* Tech Shape Decorations */}
                                        <div className="absolute inset-0 pointer-events-none border border-white/5" style={{ clipPath: "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)" }}></div>

                                        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                                            {project.description}
                                        </p>

                                        {/* Glowing Star Dust Tags */}
                                        <ul className="flex flex-wrap gap-2 md:gap-3">
                                            {project.tags.map(tag => (
                                                <li key={tag} className="px-3 py-1 rounded-full text-xs font-mono text-amber-400 bg-black/50 border border-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.1)] hover:border-amber-400/50 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300">
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Links - Moved outside to align bottom */}
                                    <div className={`flex items-center gap-6 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                        <a href={project.links.github} className="text-slate-300 hover:text-amber-400 transform hover:-translate-y-1 transition-all duration-300">
                                            <Github size={20} />
                                        </a>
                                        <a href={project.links.external} className="text-slate-300 hover:text-amber-400 transform hover:-translate-y-1 transition-all duration-300">
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
