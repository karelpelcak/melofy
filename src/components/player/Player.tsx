"use client";

import { useAudioPlayer } from "@/context/playerContext";
import { useEffect, useRef, useState } from "react";

export default function Player() {
    const { currentSong } = useAudioPlayer();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        if (audio) {
            // Load the new song
            audio.load();

            // Play the new song if it should be playing
            if (isPlaying) {
                audio.play().catch((error) => {
                    console.error("Error playing audio:", error);
                });
            }
        }

        // Cleanup function to pause the audio when the component unmounts or when the song changes
        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0; // Reset to the start
            }
        };
    }, [currentSong, isPlaying]); // Add isPlaying to the dependency array

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play().catch((error) => {
                    console.error("Error playing audio:", error);
                });
            }
            setIsPlaying(!isPlaying); // Toggle play state
        }
    };

    return (
        <div className="absolute w-screen bottom-0 bg-neutral-900 border-t border-neutral-700 px-4 py-3">
            {currentSong ? (
                <div>
                    <div className="text-white text-sm font-semibold">{currentSong.title}</div>
                    <audio ref={audioRef} controls>
                        <source src={currentSong.url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <button onClick={handlePlayPause} className="text-white">
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                </div>
            ) : (
                <div className="text-white text-sm">No song selected</div>
            )}
        </div>
    );
}
