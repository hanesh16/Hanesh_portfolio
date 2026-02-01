import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code2, Database, Cloud, Terminal, Cpu } from 'lucide-react';

const SkillBadge = ({ icon: Icon, label, color }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -2 }}
    className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 ${color} hover:border-current transition-all duration-300 cursor-default`}
  >
    <Icon size={16} />
    <span className="text-sm font-medium">{label}</span>
  </motion.div>
);

const TechStack = () => {
  const skills = [
    { icon: Code2, label: "React", color: "text-slate-400 hover:text-amber-500/80 hover:border-amber-500/20" },
    { icon: Terminal, label: "Python", color: "text-slate-400 hover:text-amber-500/80 hover:border-amber-500/20" },
    { icon: Cloud, label: "AWS", color: "text-slate-400 hover:text-amber-500/80 hover:border-amber-500/20" },
    { icon: Database, label: "PostgreSQL", color: "text-slate-400 hover:text-amber-500/80 hover:border-amber-500/20" },
    { icon: Cpu, label: "Docker", color: "text-slate-400 hover:text-amber-500/80 hover:border-amber-500/20" },
    { icon: Rocket, label: "GraphQL", color: "text-slate-400 hover:text-amber-500/80 hover:border-amber-500/20" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <SkillBadge key={skill.label} {...skill} />
      ))}
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="section-full relative">
      <div className="max-w-6xl mx-auto px-6 py-12">
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
            <span className="text-amber-500/70 font-mono text-sm">01</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white/90">
              About Me
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-white/90 leading-tight">
              Building the <span className="text-amber-500/80">future</span> with code
            </h2>

            {/* Description */}
            <div className="space-y-4 text-slate-500 leading-relaxed">
              <p>
                I'm Hanesh Koganti, a passionate Full Stack Developer with expertise in modern web technologies and cloud infrastructure. 
                My journey in tech has been driven by a fascination with creating seamless digital experiences.
              </p>
              <p>
                Currently at Comcast, I develop and maintain backend services that handle millions of requests, 
                while exploring the frontiers of AI and machine learning. I believe in writing clean, scalable code 
                that makes a real impact.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="pt-4">
              <p className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-4">Tech Stack</p>
              <TechStack />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[
                { value: "2+", label: "Years Experience" },
                { value: "10+", label: "Projects Built" },
                { value: "5+", label: "Technologies" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-amber-500/80">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-mono mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-3xl blur-2xl" />
            
            {/* Main card */}
            <div className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 overflow-hidden">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-5 code-grid" />

              {/* Content */}
              <div className="relative space-y-6">
                {/* Terminal header */}
                <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-4 text-xs font-mono text-slate-600">~/about/developer.json</span>
                </div>

                {/* Code-like content */}
                <div className="font-mono text-sm space-y-3">
                  <div className="text-slate-600">
                    <span className="text-violet-400/80">const</span>{' '}
                    <span className="text-cyan-400/80">developer</span> = {'{'}
                  </div>
                  <div className="pl-4 text-slate-500">
                    <span className="text-amber-500/80">name</span>:{' '}
                    <span className="text-green-400/80">Hanesh Koganti</span>,
                  </div>
                  <div className="pl-4 text-slate-500">
                    <span className="text-amber-500/80">role</span>:{' '}
                    <span className="text-green-400/80">Full Stack Developer</span>,
                  </div>
                  <div className="pl-4 text-slate-500">
                    <span className="text-amber-500/80">location</span>:{' '}
                    <span className="text-green-400/80">Sunnyvale, WA</span>,
                  </div>
                  <div className="pl-4 text-slate-500">
                    <span className="text-amber-500/80">passion</span>:{' '}
                    <span className="text-green-400/80">[Building, Learning, Creating]</span>,
                  </div>
                  <div className="pl-4 text-slate-500">
                    <span className="text-amber-500/80">available</span>:{' '}
                    <span className="text-orange-400/80">true</span>,
                  </div>
                  <div className="text-slate-600">{'}'};</div>
                </div>

                {/* Animated cursor */}
                <motion.div
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-3 h-5 bg-amber-500/60"
                />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500/80 text-sm font-mono"
            >
              &lt;Developer /&gt;
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-slate-700/30 border border-slate-600/30 text-slate-400 text-sm font-mono"
            >
              npm start career
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
