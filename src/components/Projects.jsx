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
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            accent: "amber"
        },
        {
            title: "Generative AI in Healthcare",
            description: "Compared and fine-tuned LLMs (RoBERTa, Gemma, Gemini Pro) for healthcare QA; boosted model precision from 54% to 75%, achieving 100% accuracy with Gemini Pro. Developed a healthcare chatbot using transformer models and PyTorch.",
            tags: ["LLMs", "Transformers", "PyTorch", "Python"],
            links: { github: "https://github.com/hanesh16", external: "#" },
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop",
            accent: "violet"
        },
        {
            title: "University Inventory Management System",
            description: "Built an inventory system with TypeScript, GraphQL, and React; increased tracking efficiency by 25%. Containerized app with Docker and orchestrated microservices using Kubernetes. Automated API testing with Postman and SQS.",
            tags: ["TypeScript", "Docker", "GraphQL", "React", "K8s"],
            links: { github: "https://github.com/hanesh16", external: "#" },
            image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=2070&auto=format&fit=crop",
            accent: "cyan"
        },
        {
            title: "PSU Events",
            description: "Developed a Django system for event and venue management with user role-based access and CRUD functionality for efficient administration.",
            tags: ["Django", "Python", "HTML/CSS", "PostgreSQL"],
            links: { github: "https://github.com/hanesh16", external: "#" },
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
            accent: "rose"
        }
    ];

    const accentColors = {
        amber: {
            primary: '#fbbf24',
            glow: 'rgba(251, 191, 36, 0.3)',
            border: 'rgba(251, 191, 36, 0.2)'
        },
        violet: {
            primary: '#8b5cf6',
            glow: 'rgba(139, 92, 246, 0.3)',
            border: 'rgba(139, 92, 246, 0.2)'
        },
        cyan: {
            primary: '#22d3ee',
            glow: 'rgba(34, 211, 238, 0.3)',
            border: 'rgba(34, 211, 238, 0.2)'
        },
        rose: {
            primary: '#f472b6',
            glow: 'rgba(244, 114, 182, 0.3)',
            border: 'rgba(244, 114, 182, 0.2)'
        }
    };

    return (
        <section id="projects" className="pt-24 pb-24 relative z-10">
            <div className="max-w-[1000px] mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-20"
                >
                    <span className="text-cosmic-amber font-bold text-xl font-mono">03.</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-outfit bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent glow-text">Some Things I've Built</h2>
                    <div className="h-[1px] bg-gradient-to-r from-cosmic-violet/50 to-transparent flex-grow ml-4 max-w-xs"></div>
                </motion.div>

                <div className="flex flex-col gap-24 md:gap-32">
                    {projects.map((project, index) => {
                        const isEven = index % 2 === 0;
                        const accent = accentColors[project.accent];
                        
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
                                        <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-slate-700/50 shadow-2xl transition-all duration-500 group-hover:border-cosmic-amber/30 group-hover:shadow-[0_0_40px_rgba(251,191,36,0.15)]">
                                            {/* Overlay Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent group-hover:bg-transparent transition-all duration-300 z-20"></div>
                                            <div className="absolute inset-0 bg-black/70 group-hover:bg-transparent transition-all duration-300 z-10 pointer-events-none"></div>
                                            
                                            {/* Accent glow on hover */}
                                            <div 
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5"
                                                style={{ boxShadow: `inset 0 0 60px ${accent.glow}` }}
                                            ></div>

                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                                                loading="lazy"
                                                decoding="async"
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
                                    <h4 
                                        className="font-mono text-sm mb-2"
                                        style={{ color: accent.primary }}
                                    >
                                        Featured Project
                                    </h4>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent mb-6 hover:text-cosmic-amber transition-colors cursor-pointer inline-block">
                                        <a href={project.links.external || project.links.github}>{project.title}</a>
                                    </h3>

                                    <div
                                        className="p-6 md:p-8 rounded-none md:hover:scale-[1.02] transition-transform duration-300 group-card relative mb-6"
                                        style={{
                                            clipPath: "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)",
                                            background: `
                                                radial-gradient(ellipse at top right, ${accent.glow} 0%, transparent 50%),
                                                radial-gradient(ellipse at bottom left, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
                                                rgba(0, 0, 0, 0.95)
                                            `,
                                            backdropFilter: "blur(16px)",
                                            border: `1px solid ${accent.border}`,
                                            boxShadow: `
                                                0 4px 30px rgba(0, 0, 0, 0.3),
                                                0 0 30px ${accent.glow}
                                            `,
                                            backgroundImage: `
                                                radial-gradient(white, rgba(255, 255, 255, .15) 1px, transparent 2px),
                                                radial-gradient(white, rgba(255, 255, 255, .1) 1px, transparent 2px),
                                                radial-gradient(ellipse at top right, ${accent.glow} 0%, transparent 50%),
                                                radial-gradient(ellipse at bottom left, rgba(139, 92, 246, 0.05) 0%, transparent 50%),
                                                rgba(0, 0, 0, 0.95)
                                            `,
                                            backgroundSize: "400px 400px, 300px 300px, 100% 100%, 100% 100%, 100% 100%",
                                            backgroundPosition: "0 0, 40px 60px, 0 0, 0 0, 0 0"
                                        }}
                                    >
                                        {/* Sci-Fi Decorative Elements */}
                                        <div className="absolute top-10 right-10 w-1 h-1 bg-white rounded-full animate-pulse z-0" style={{ boxShadow: `0 0 10px 2px ${accent.primary}` }}></div>
                                        <div className="absolute bottom-20 left-10 w-[2px] h-[2px] bg-cosmic-cyan rounded-full animate-pulse z-0" style={{ animationDelay: "1s", boxShadow: "0 0 8px 1px rgba(34, 211, 238, 0.6)" }}></div>
                                        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cosmic-violet rounded-full animate-pulse z-0" style={{ animationDelay: "2s", boxShadow: "0 0 8px 1px rgba(139, 92, 246, 0.4)", opacity: 0.6 }}></div>

                                        {/* Tech Shape Decorations */}
                                        <div className="absolute inset-0 pointer-events-none border border-white/5" style={{ clipPath: "polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)" }}></div>

                                        <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                                            {project.description}
                                        </p>

                                        {/* Glowing Star Dust Tags */}
                                        <ul className={`flex flex-wrap gap-2 md:gap-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                            {project.tags.map(tag => (
                                                <li 
                                                    key={tag} 
                                                    className="px-3 py-1 rounded-full text-xs font-mono bg-black/50 border transition-all duration-300 hover:scale-105"
                                                    style={{ 
                                                        color: accent.primary,
                                                        borderColor: accent.border,
                                                        boxShadow: `0 0 10px ${accent.glow}`
                                                    }}
                                                >
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Links - Moved outside to align bottom */}
                                    <div className={`flex items-center gap-6 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                        <a href={project.links.github} className="text-slate-400 hover:text-cosmic-amber transform hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-all duration-300">
                                            <Github size={20} />
                                        </a>
                                        <a href={project.links.external} className="text-slate-400 hover:text-cosmic-cyan transform hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300">
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
