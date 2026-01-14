import React from 'react';

const SpaceLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64 w-full">
            <div className="relative w-24 h-24 mb-8">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>

                {/* Spinning Active Ring */}
                <div className="absolute inset-0 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>

                {/* Inner Pulsing Core */}
                <div className="absolute inset-0 m-8 bg-amber-400/20 rounded-full animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.5)]"></div>

                {/* Orbiting Dot */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                    <div className="w-2 h-2 bg-white rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2 shadow-[0_0_10px_white]"></div>
                </div>
            </div>

            <div className="text-amber-400 font-mono text-sm tracking-widest animate-pulse">
                INITIALIZING SYSTEMS...
            </div>
        </div>
    );
};

export default SpaceLoader;
