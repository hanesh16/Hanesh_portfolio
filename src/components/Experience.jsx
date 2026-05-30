import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink, Code2 } from 'lucide-react';

const ExperienceCard = ({ exp, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true }}
    className="relative pl-6 sm:pl-8 md:pl-12"
  >
    {/* Timeline line */}
    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/30 via-amber-500/10 to-transparent" />

    {/* Timeline dot */}
    <motion.div
      className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-amber-500/60"
      animate={{
        boxShadow: ['0 0 0 0 rgba(245,158,11,0.2)', '0 0 0 8px rgba(245,158,11,0)', '0 0 0 0 rgba(245,158,11,0)']
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* Card */}
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
      <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 hover:border-amber-500/20 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white/90 group-hover:text-amber-500/90 transition-colors">
              {exp.role}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-amber-500/80 font-semibold">{exp.company}</span>
              <a
                href="#"
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
              <Calendar size={14} className="text-amber-500/70" />
              <span className="text-xs sm:text-sm text-slate-400 font-mono">{exp.period}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <MapPin size={14} />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>

        {/* Responsibilities */}
        {exp.points?.length > 0 && (
          <ul className="space-y-3 mb-7">
            {exp.points.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300/90 text-sm sm:text-base leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/70" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack */}
        {exp.skills?.length > 0 && (
          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Code2 size={14} className="text-amber-500/70" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {exp.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-amber-200/80 bg-amber-500/5 border border-amber-500/15 hover:border-amber-500/40 hover:bg-amber-500/10 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const Experience = () => {
  const experiences = [
     {
      company: "Microsoft",
      location: "Seattle, United States",
      role: "Software Engineer II",
      period: "Mar 2026 – Present",
      points: [],
      skills: [".NET", "C#", "ASP.NET Core", "Azure App Services", "Azure Cloud", "REST APIs", "Microservices", "Docker", "CI/CD", "SQL"]
    },

    {
      company: "Comcast",
      location: "United States",
      role: "Software Engineer",
      period: "Jul 2024 – Feb 2026 · 1 yr 8 mos",
      points: [],
      skills: ["Python", "Flask", "SQL", "REST APIs", "Microservices", "Bash", "Docker", "Linux", "CI/CD", "PyTest"]
    }
  ];

  return (
    <section id="experience" className="section-full relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <div className="flex items-center gap-3">
            <span className="text-amber-500/90 font-mono text-sm">02</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white/90">
              Experience
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} />
          ))}

          {/* Future placeholder */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="relative pl-6 sm:pl-8 md:pl-12 pt-8"
          >
            <div className="absolute left-0 top-8 w-2.5 h-2.5 rounded-full border-2 border-dashed border-slate-700" />
            <div className="p-6 rounded-2xl border border-dashed border-slate-800 bg-black/20">
              <p className="text-slate-400 font-mono text-sm flex items-center gap-2">
                <span className="text-amber-500/60">→</span>
                Next mission loading...
              </p>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default Experience;
