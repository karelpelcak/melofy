"use client";

import {ChangeEvent, useEffect, useRef} from "react";
import {useAudioPlayer} from "@/context/playerContext";

export default function Player() {
    const { currentSong } = useAudioPlayer();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (currentSong && audioRef.current) {
            const audio = audioRef.current;

            audio.muted = true; // nutné pro autoplay na iOS
            audio.src = currentSong.url;
            audio.volume = 0.3;

            audio.play().catch((err) => {
                console.warn("Autoplay failed, čekám na uživatelskou interakci:", err);
            });
        }
    }, [currentSong]);


    const changeVolume = (event: ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.volume = Number(event.target.value) / 100;
        }
    };

    return (
        <div className="absolute w-screen bottom-0">
            <div className="max-w-screen h-[100px] md:h-[75px] border-t-2 border-gray-500">
                <div className="flex flex-col md:flex-row items-center justify-between px-5">
                    <div className="flex-shrink-0">
                        <p>Now Playing: {currentSong?.title ?? "Nothing"}</p>
                    </div>
                    <div className="flex-grow flex justify-center">
                        <audio ref={audioRef}>
                            <source src={currentSong?.url} type="audio/mp3" />
                        </audio>
                    </div>
                    <div className="flex-shrink-0">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            defaultValue="30"
                            onChange={changeVolume}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}



