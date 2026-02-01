import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2, Stars } from 'lucide-react';
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = import.meta.env.VITE_GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const modelName = "gpt-4o";

const ExploreSpace = () => {
    const [query, setQuery] = React.useState('');
    const [response, setResponse] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim() || isLoading) return;

        setIsLoading(true);
        setResponse(null);
        setError(null);

        try {
            if (!token) {
                throw new Error("Missing GitHub Token");
            }

            const client = ModelClient(
                endpoint,
                new AzureKeyCredential(token),
            );

            const apiResponse = await client.path("/chat/completions").post({
                body: {
                    messages: [
                        { role: "system", content: "You are the voice of the universe. Provide an exact, direct, and profound answer in a single short sentence or tagline. Avoid padding or pleasantries." },
                        { role: "user", content: query }
                    ],
                    temperature: 0.7,
                    max_tokens: 100,
                    model: modelName
                }
            });

            if (isUnexpected(apiResponse)) {
                throw apiResponse.body.error || new Error("An unexpected error occurred.");
            }

            setResponse(apiResponse.body.choices[0].message.content);

        } catch (err) {
            console.error("AI Error:", err);
            setError("The signal was lost in deep space. Please try again.");
            setResponse(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
            style={{ backgroundColor: 'transparent', fontFamily: '"Inter", sans-serif' }}>

            {/* Cosmic Background Effects */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cosmic-violet/10 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cosmic-amber/10 rounded-full blur-[150px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cosmic-cyan/5 rounded-full blur-[120px]"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                            boxShadow: `0 0 10px 2px ${i % 2 === 0 ? 'rgba(251, 191, 36, 0.5)' : 'rgba(139, 92, 246, 0.5)'}`
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center px-6 max-w-3xl mx-auto backdrop-blur-xl p-10 rounded-3xl border border-white/10 bg-black/40"
                style={{
                    boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.4),
                        0 0 60px rgba(251, 191, 36, 0.08),
                        0 0 100px rgba(139, 92, 246, 0.05),
                        inset 0 1px 0 rgba(255, 255, 255, 0.05)
                    `
                }}
            >
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cosmic-amber/30 rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-cosmic-violet/30 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-cosmic-violet/30 rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cosmic-amber/30 rounded-br-3xl"></div>

                <div className="mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Stars className="text-cosmic-amber" size={24} />
                        <h2 className="text-4xl md:text-5xl font-light bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent tracking-tight">
                            Where curiosity begins.
                        </h2>
                        <Stars className="text-cosmic-violet" size={24} />
                    </div>
                    <p className="text-slate-400 text-lg font-light">
                        Ask the universe anything.
                    </p>
                </div>

                {/* Search Bar Visual */}
                <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto group relative">
                    <div 
                        className={`backdrop-blur-md border rounded-2xl p-2 pl-6 flex items-center shadow-2xl transition-all duration-300 ${
                            isLoading 
                                ? 'border-cosmic-cyan/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]' 
                                : 'border-white/10 group-hover:border-cosmic-amber/30 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]'
                        }`}
                        style={{
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(20,20,30,0.5) 100%)'
                        }}
                    >
                        <Sparkles className={`mr-4 shrink-0 transition-opacity ${isLoading ? 'text-cosmic-cyan opacity-100' : 'text-cosmic-amber/70 opacity-100'}`} size={20} />

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Explore deep space..."
                            className="bg-transparent border-none outline-none text-slate-200 text-lg w-full placeholder-slate-500 font-light py-2"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !query.trim()}
                            className={`p-2 rounded-xl transition-all ml-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                                isLoading
                                    ? 'bg-cosmic-cyan/20 text-cosmic-cyan'
                                    : 'bg-gradient-to-r from-cosmic-amber/20 to-cosmic-violet/20 text-slate-200 hover:from-cosmic-amber/30 hover:to-cosmic-violet/30'
                            }`}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin text-cosmic-cyan" size={20} />
                            ) : (
                                <ArrowRight size={20} />
                            )}
                        </button>
                    </div>
                </form>

                {/* AI Response Area details */}
                <div className="min-h-[8rem] mt-6 flex items-start justify-center w-full">
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-slate-400 font-light flex items-center gap-3"
                        >
                            <div className="flex gap-1">
                                <motion.span
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                    className="w-2 h-2 bg-cosmic-cyan rounded-full"
                                />
                                <motion.span
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                    className="w-2 h-2 bg-cosmic-violet rounded-full"
                                />
                                <motion.span
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                    className="w-2 h-2 bg-cosmic-amber rounded-full"
                                />
                            </div>
                            Establishing uplink...
                        </motion.div>
                    )}

                    {!isLoading && error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-lg font-light leading-relaxed max-w-xl"
                        >
                            &ldquo;{error}&rdquo;
                        </motion.div>
                    )}

                    {!isLoading && response && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-lg font-light leading-relaxed max-w-xl break-words"
                        >
                            <span className="bg-gradient-to-r from-cosmic-amber via-cosmic-violet to-cosmic-cyan bg-clip-text text-transparent">
                                &ldquo;{response}&rdquo;
                            </span>
                        </motion.div>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-center gap-6 text-slate-500 text-sm">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-cosmic-amber rounded-full shadow-[0_0_6px_rgba(251,191,36,0.8)]"></span>
                        Powered by Stardust
                    </span>
                    <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-cosmic-violet rounded-full shadow-[0_0_6px_rgba(139,92,246,0.8)]"></span>
                        Designed for Orbit
                    </span>
                </div>
            </motion.div>
        </section>
    );
};

export default ExploreSpace;
