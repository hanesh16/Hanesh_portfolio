import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

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
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />

        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 group-hover:border-amber-500/30 transition-all duration-500 glow-border">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
            style={{ filter: 'grayscale(30%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500/0 group-hover:border-amber-500/40 transition-all duration-300" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500/0 group-hover:border-amber-500/40 transition-all duration-300" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-4">
              <motion.a
                href={project.links.github}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-amber-500/80 hover:text-black transition-all"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href={project.links.external}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-slate-600 hover:text-white transition-all"
              >
                <ExternalLink size={20} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`space-y-4 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-amber-500/90 uppercase tracking-widest">Featured Project</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 hover:text-amber-500/90 transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-300 leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack with shimmer */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="shimmer-badge px-3 sm:px-4 py-1.5 text-xs font-mono rounded-full bg-white/5 text-slate-300 border border-white/10 hover:border-amber-500/30 hover:text-slate-200 transition-all cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4">
          <a
            href={project.links.github}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group/link"
          >
            <Github size={18} />
            <span className="text-sm font-mono">Source</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>
          <a
            href={project.links.external}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors group/link"
          >
            <ExternalLink size={18} />
            <span className="text-sm font-mono">Live Demo</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>
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
      tags: ["Django", "Python", "HTML", "CSS", "JS", "Git"],
      links: { github: "https://github.com/hanesh16", external: "#" },
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section id="work" className="section-full relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <div className="flex items-center gap-3">
            <span className="text-amber-500/90 font-mono text-sm">03</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white/90">
              Projects
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
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
