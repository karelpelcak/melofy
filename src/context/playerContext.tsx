"use client";

import React, { createContext, useContext, useState } from "react";

type Song = {
    title: string;
    url: string;
};

type AudioContextType = {
    currentSong: Song | null;
    playSong: (song: Song) => void;
};

const AudioPlayerContext = createContext<AudioContextType | undefined>(undefined);

export const AudioPlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);

    const playSong = (song: Song) => {
        setCurrentSong(song);
    };

    return (
        <AudioPlayerContext.Provider value={{ currentSong, playSong }}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

export const useAudioPlayer = () => {
    const context = useContext(AudioPlayerContext);
    if (!context) {
        throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
    }
    return context;
};
