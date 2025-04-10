"use client";

import { useEffect, useRef } from "react";
import {useAudioPlayer} from "@/context/playerContext";

export default function Player() {
    const { currentSong } = useAudioPlayer();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.src = currentSong.url;
            audioRef.current.play();
        }
    }, [currentSong]);

    return (
        <div>
            <p>Now Playing: {currentSong?.title ?? "Nothing"}</p>
            <audio ref={audioRef} controls autoPlay={false} />
        </div>
    );
}
