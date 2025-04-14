"use client";

import { createContext, useContext, useRef, useState } from "react";

type Song = {
    title: string;
    url: string;
};

const PlayerContext = createContext<any>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playSong = (song: Song) => {
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

export const useAudioPlayer = () => useContext(PlayerContext);
