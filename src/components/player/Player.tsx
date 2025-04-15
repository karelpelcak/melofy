"use client";

import { useAudioPlayer } from "@/context/playerContext";
import {useEffect, useRef} from "react";

export default function Player() {
    const { currentSong} = useAudioPlayer();
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if(audioRef.current) {
            audioRef.current.play();
        }
}, [currentSong])

    return (
        <div className="absolute w-screen bottom-0 bg-neutral-900 border-t border-neutral-700 px-4 py-3">
            {currentSong && currentSong.title}
            <audio ref={audioRef} controls>
                {currentSong?.url && <source src={currentSong.url} type="audio/mpeg" />}
            </audio>
        </div>
    );
}
