"use client";

import { useAudioPlayer } from "@/context/playerContext";

export default function Player() {
    const { currentSong, audioRef } = useAudioPlayer();

    return (
        <div className="absolute w-screen bottom-0">
            <div className="h-[100px] md:h-[75px] border-t-2 border-gray-500">
                {currentSong.title}
                <audio ref={audioRef} preload="auto">
                    {currentSong?.url && <source src={currentSong.url} type="audio/mpeg" />}
                </audio>
            </div>
        </div>
    );
}
