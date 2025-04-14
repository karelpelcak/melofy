"use client";

import { createContext, useContext, useRef, useState } from "react";

type Song = {
    title: string;
    url: string;
};

type AudioPlayerContextType = {
    currentSong: Song | null;
    setCurrentSong: (song: Song) => void;
    audioRef: React.RefObject<HTMLAudioElement>;
};

const PlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const audioRef = useRef<HTMLAudioElement | undefined>(undefined);

    const playSong = (song: Song) => {
        console.log("play song", song);
        setCurrentSong(song);

        setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.load();
                audioRef.current
                    .play()
                    .then(() => console.log("Playing!"))
                    .catch((err) => console.error("Playback error:", err));
            }
        }, 0); // Timeout kvůli async re-renderu
    };

    return (
        <PlayerContext.Provider value={{ currentSong, playSong, audioRef }}>
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