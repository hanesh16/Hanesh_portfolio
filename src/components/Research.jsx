import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, ArrowUpRight, Quote } from 'lucide-react';

const ResearchCard = ({ publication, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      viewport={{ once: true }}
      className={`grid lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}
    >
      {/* Visual / Abstract Card */}
      <div className={`relative group ${isEven ? '' : 'lg:col-start-2'}`}>
        <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />

        <div className="relative rounded-xl overflow-hidden border border-white/5 group-hover:border-amber-500/30 transition-all duration-500 glow-border p-8 bg-white/[0.02]">
          {/* Decorative quote icon */}
          <Quote size={48} className="text-amber-500/10 absolute top-6 right-6" />

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500/0 group-hover:border-amber-500/40 transition-all duration-300" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500/0 group-hover:border-amber-500/40 transition-all duration-300" />

          {/* Key findings */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-amber-500/70 uppercase tracking-widest">Key Highlights</span>
            <ul className="space-y-3">
              {publication.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/60 shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Citation badge */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <BookOpen size={14} className="text-amber-500/80" />
              <span className="text-xs font-mono text-amber-500/90">{publication.citations} Citations</span>
            </div>
            <span className="text-xs font-mono text-slate-500">{publication.date}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`space-y-4 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-amber-500/90 uppercase tracking-widest">Research Publication</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 hover:text-amber-500/90 transition-colors">
          {publication.title}
        </h3>

        <p className="text-sm text-slate-400 font-mono">
          {publication.journal}
        </p>

        <p className="text-slate-300 leading-relaxed">
          {publication.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {publication.tags.map((tag) => (
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
            href={publication.links.arxiv}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group/link"
          >
            <BookOpen size={18} />
            <span className="text-sm font-mono">arXiv</span>
            <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>
          {publication.links.external && (
            <a
              href={publication.links.external}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors group/link"
            >
              <ExternalLink size={18} />
              <span className="text-sm font-mono">Journal</span>
              <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Research = () => {
  const publications = [
    {
      title: "Short Term Price Prediction of Cryptocurrencies",
      journal: "International Journal of Modern Physics",
      date: "Aug. 2023",
      description: "Predicted the short-term price of different cryptocurrencies using inequality analysis methods such as the Gini Index and K-Values measured from the Lorenz curve over the closed price of cryptocurrencies.",
      highlights: [
        "Evaluated performance of different ML algorithms using Python and scikit-learn, achieving a top accuracy of 92%.",
        "Published in the International Journal of Modern Physics, with 13 citations.",
      ],
      tags: ["Python", "Inequality Analysis", "Machine Learning", "scikit-learn"],
      citations: 13,
      links: {
        arxiv: "https://arxiv.org",
        external: "#",
      },
    },
    {
      title: "Machine Learning Predictions of COVID-19 Second Wave",
      journal: "Indian Journal of Physics",
      date: "Dec. 2022",
      description: "Implemented the SIR complex Mathematical Model to simulate the COVID-19 pandemic under optimal conditions and leveraged Random Forest algorithm to analyze SIR model data.",
      highlights: [
        "Accurately predicted the end time of the second wave with 85% accuracy using Random Forest algorithm.",
        "Authored the paper in the Indian Journal of Physics, with 4 citations and backed by 48 references.",
      ],
      tags: ["Python", "Random Forest", "SIR Model", "Data Analysis"],
      citations: 4,
      links: {
        arxiv: "https://arxiv.org",
        external: "#",
      },
    },
  ];

  return (
    <section className="section-full relative">
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
            <span className="text-amber-500/90 font-mono text-sm">04</span>
            <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white/90">
              Research
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </motion.div>

        {/* Publications */}
        <div className="space-y-24">
          {publications.map((publication, index) => (
            <ResearchCard key={index} publication={publication} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
