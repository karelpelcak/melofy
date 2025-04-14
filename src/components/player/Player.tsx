"use client";

import { useAudioPlayer } from "@/context/playerContext";
import { useEffect, useState } from "react";

export default function Player() {
    const { currentSong, audioRef } = useAudioPlayer();
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    // Aktualizace progress baru
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            setProgress(audio.currentTime);
            setDuration(audio.duration || 0);
        };

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("loadedmetadata", updateProgress);

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("loadedmetadata", updateProgress);
        };
    }, [audioRef]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(console.error);
            setIsPlaying(true);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
        setProgress(time);
    };

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = vol;
        }
        setVolume(vol);
    };

    return (
        <div className="absolute w-screen bottom-0 bg-neutral-900 border-t border-neutral-700 px-4 py-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
                <div className="flex-1 text-sm font-semibold">{currentSong?.title || "Žádná skladba"}</div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handlePlayPause}
                        className="bg-white text-black rounded-full px-4 py-1 text-sm font-semibold shadow hover:bg-gray-200 transition"
                    >
                        {isPlaying ? "Pause" : "Play"}
                    </button>

                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        step={0.1}
                        value={progress}
                        onChange={handleSeek}
                        className="w-40 md:w-60"
                    />
                    <span className="text-xs w-24 text-right">
            {(progress / 60).toFixed(0).padStart(2, '0')} : {(progress % 60).toFixed(0).padStart(2, '0')} / {(duration / 60).toFixed(0).padStart(2, '0')} : {(duration % 60).toFixed(0).padStart(2, '0')}
          </span>

                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolume}
                        className="w-20"
                    />
                </div>
            </div>

            <audio ref={audioRef} preload="auto">
                {currentSong?.url && <source src={currentSong.url} type="audio/mpeg" />}
            </audio>
        </div>
    );
}
