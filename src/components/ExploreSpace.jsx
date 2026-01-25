
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
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



            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center px-6 max-w-3xl mx-auto backdrop-blur-sm p-8 rounded-3xl border border-white/5 bg-black/20"
            >
                <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-light text-[#e8e8e6] mb-4 tracking-tight">
                        Where curiosity begins.
                    </h2>
                    <p className="text-[#8d8d8a] text-lg font-light">
                        Ask the universe anything.
                    </p>
                </div>

                {/* Search Bar Visual */}
                <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto group relative">
                    <div className={`bg-[#1f1d21]/80 backdrop-blur-md border ${isLoading ? 'border-blue-500/50' : 'border-[#2d2b2f]'} rounded-2xl p-2 pl-6 flex items-center shadow-2xl transition-all duration-300 group-hover:border-[#3d3b3f] group-hover:bg-[#252327]/90`}>
                        <Sparkles className={`text-[#8d8d8a] mr-4 shrink-0 transition-opacity ${isLoading ? 'opacity-50' : 'opacity-100'}`} size={20} />

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Explore deep space..."
                            className="bg-transparent border-none outline-none text-[#e8e8e6] text-lg w-full placeholder-[#5d5d5a] font-light py-2"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !query.trim()}
                            className={`bg-[#3d3b3f] text-[#e8e8e6] p-2 rounded-xl hover:bg-[#4d4b4f] transition-all ml-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin text-white" size={20} />
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
                            className="text-[#8d8d8a] font-light flex items-center gap-2"
                        >
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Establishing uplink...
                        </motion.div>
                    )}

                    {!isLoading && error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-lg font-light leading-relaxed max-w-xl"
                        >
                            "{error}"
                        </motion.div>
                    )}

                    {!isLoading && response && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#e8e8e6] text-lg font-light leading-relaxed max-w-xl break-words"
                        >
                            "{response}"
                        </motion.div>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-center gap-6 text-[#5d5d5a] text-sm">
                    <span>Powered by Stardust</span>
                    <span className="w-1 h-1 bg-[#5d5d5a] rounded-full"></span>
                    <span>Designed for Orbit</span>
                </div>
            </motion.div>
        </section>
    );
};

export default ExploreSpace;
