"use client";

import { createContext, useContext, useState } from "react";

type Song = {
    title: string;
    url: string;
};

type AudioPlayerContextType = {
    currentSong: Song | null;
    playSong: (song: Song) => void;
};

const PlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);

    const playSong = (song: Song) => {
        console.log("play song", song);
        setCurrentSong(song);
    };

    return (
        <PlayerContext.Provider value={{playSong, currentSong }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const useAudioPlayer = (): AudioPlayerContextType => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
    }
    return context;
};
