"use client";

import { useAudioPlayer } from "@/context/playerContext";

export default function Player() {
    const { currentSong} = useAudioPlayer();

    return (
        <div className="absolute w-screen bottom-0 bg-neutral-900 border-t border-neutral-700 px-4 py-3">
            {currentSong && currentSong.title}
            <audio preload="auto">
                {currentSong?.url && <source src={currentSong.url} type="audio/mpeg" />}
            </audio>
        </div>
    );
}
