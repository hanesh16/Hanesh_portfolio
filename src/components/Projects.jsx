import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`grid lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}
    >
      {/* Image */}
      <div className={`relative group ${isEven ? '' : 'lg:col-start-2'}`}>
        {/* Animated gradient border */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-amber-500 via-violet-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
        
        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group-hover:border-amber-400/30 transition-all duration-500">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
            style={{ filter: 'grayscale(20%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400/0 group-hover:border-amber-400/60 transition-all duration-300" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400/0 group-hover:border-amber-400/60 transition-all duration-300" />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-4">
              <motion.a
                href={project.links.github}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-amber-400/30 text-amber-400 hover:bg-amber-400 hover:text-black transition-all"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href={project.links.external}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
              >
                <ExternalLink size={20} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`space-y-4 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
        <div className="flex items-center gap-3">
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">Featured Project</span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-bold text-white hover:text-amber-400 transition-colors glitch-text" data-text={project.title}>
          {project.title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag, idx) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-4 py-1.5 text-xs font-mono rounded-full bg-white/5 text-slate-300 border border-white/10 hover:border-amber-400/30 hover:text-amber-400 hover:bg-amber-400/5 transition-all cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4">
          <motion.a
            href={project.links.github}
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group/link"
          >
            <Github size={18} />
            <span className="text-sm font-mono">Source</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </motion.a>
          <motion.a
            href={project.links.external}
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group/link"
          >
            <ExternalLink size={18} />
            <span className="text-sm font-mono">Live Demo</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Spend Analyzer",
      description: "Built a Flask-based web app for automated expense tracking, using Google Cloud (BigQuery, OAuth2) and Azure Form Recognizer; improved expense tracking accuracy by 95%. Integrated secure authentication and SQL query-driven insights for real-time spending trend visualization.",
      tags: ["Python", "Flask", "Azure", "BigQuery", "Docker"],
      links: { github: "https://github.com/hanesh16", external: "#" },
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Generative AI Healthcare",
      description: "Compared and fine-tuned LLMs (RoBERTa, Gemma, Gemini Pro) for healthcare QA; boosted model precision from 54% to 75%, achieving 100% accuracy with Gemini Pro. Developed a healthcare chatbot using transformer models and PyTorch.",
      tags: ["LLMs", "Transformers", "PyTorch", "Python"],
      links: { github: "https://github.com/hanesh16", external: "#" },
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "University Inventory System",
      description: "Built an inventory system with TypeScript, GraphQL, and React; increased tracking efficiency by 25%. Containerized app with Docker and orchestrated microservices using Kubernetes. Automated API testing with Postman and SQS.",
      tags: ["TypeScript", "Docker", "GraphQL", "React", "K8s"],
      links: { github: "https://github.com/hanesh16", external: "#" },
      image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "PSU Events",
      description: "Developed a Django system for event and venue management with user role-based access and CRUD functionality for efficient administration.",
      tags: ["Django", "Python", "PostgreSQL", "Redis"],
      links: { github: "https://github.com/hanesh16", external: "#" },
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section id="projects" className="section-full relative">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
          <div className="flex items-center gap-3">
            <span className="text-purple-400 font-mono text-sm">03</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white glitch-text" data-text="Featured Projects">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Projects</span>
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
