"use client";

import { useAudioPlayer } from "@/context/playerContext";
import { useEffect, useRef } from "react";

export default function Player() {
    const { currentSong } = useAudioPlayer();
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            audio.load();

            audio.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
        }

        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0; // Reset to the start
            }
        };
    }, [currentSong]);

    return (
        <div className="absolute w-screen bottom-0 bg-neutral-900 border-t border-neutral-700 px-4 py-3">
            {currentSong ? (
                <div>
                    <div className="text-white text-sm font-semibold">{currentSong.title}</div>
                    <audio ref={audioRef} controls>
                        <source src={currentSong.url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            ) : (
                <div className="text-white text-sm">No song selected</div>
            )}
        </div>
    );
}
