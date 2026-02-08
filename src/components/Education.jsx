import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

const EducationCard = ({ edu, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    viewport={{ once: true }}
    className="group relative"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
    <div className="relative p-6 md:p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 hover:border-amber-500/20 transition-all duration-300 h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <GraduationCap size={28} className="text-amber-500/80" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
          <Calendar size={14} className="text-amber-500/70" />
          <span className="text-sm text-slate-400 font-mono">{edu.period}</span>
        </div>
      </div>

      {/* Institution */}
      <h3 className="text-2xl font-bold text-white/90 mb-1 group-hover:text-amber-500/90 transition-colors">
        {edu.institution}
      </h3>
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
        <MapPin size={14} />
        <span>{edu.location}</span>
      </div>

      {/* Degree */}
      <p className="text-lg text-slate-400 font-medium mb-4">
        {edu.degree}
      </p>

      {/* Highlights */}
      {edu.highlights && (
        <div className="space-y-2 mb-6">
          {edu.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Award size={14} className="text-amber-500/70 mt-1 flex-shrink-0" />
              <span className="text-sm text-slate-500">{highlight}</span>
            </div>
          ))}
        </div>
      )}

      {/* Relevant Courses */}
      {edu.courses && (
        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} className="text-amber-500/70" />
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Key Coursework</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {edu.courses.map((course) => (
              <span
                key={course}
                className="px-3 py-1 text-xs font-mono rounded-full bg-amber-500/5 text-slate-400 border border-amber-500/10"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </motion.div>
);

const CertificationCard = ({ cert, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
    viewport={{ once: true }}
    className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-500/20 transition-all duration-300 flex items-center gap-4"
  >
    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
      <Award size={20} className="text-amber-500/80" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-white/90 font-medium truncate group-hover:text-amber-500/90 transition-colors">
        {cert.name}
      </h4>
      <p className="text-sm text-slate-500">{cert.issuer}</p>
    </div>
  </motion.div>
);

const Education = () => {
  const educations = [
    {
      institution: "Portland State University",
      location: "Portland, OR",
      degree: "Master of Science in Computer Science",
      period: "Sep 2022 - Mar 2024",
      highlights: [
        "GPA: 3.67 / 4.00",
        "International Achievement Scholarship"
      ],
      courses: ["Algorithm Design Analysis", "Software Engineering", "Full Stack Web Development", "Large Language Models", "Machine Learning", "AI"]
    },
    {
      institution: "SRM University",
      location: "AP, India",
      degree: "B.Tech Computer Science and Engineering",
      period: "Jul 2018 - May 2022",
      highlights: [
        "Active member of IEEE"
      ],
      courses: ["Computer Organization", "Object Oriented Programming", "Data Science", "Big Data Analytics", "Computer Networks"]
    }
  ];

  const certifications = [
    { name: "Google Cloud Arcade Facilitator Program 2025 (Cohort 1)", issuer: "Google Cloud" },
  ];

  return (
    <section id="education" className="section-full relative">
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
            <span className="text-amber-500/70 font-mono text-sm">04</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white/90">
              Education
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </motion.div>

        {/* Education Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {educations.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/5"
        >
          <h3 className="text-xl font-bold text-white/90 mb-6 flex items-center gap-3">
            <Award className="text-amber-500/80" size={24} />
            Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <CertificationCard key={index} cert={cert} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
