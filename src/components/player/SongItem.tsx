"use client";

import { useAudioPlayer } from "@/context/playerContext";

type Song = {
    title: string;
    url: string;
};

export default function SongItemClient({ song }: { song: Song }) {
    const { audioRef, setCurrentSong } = useAudioPlayer();

    const handleClick = () => {
        if (audioRef.current) {
            audioRef.current.src = song.url;
            audioRef.current.play().catch(console.error); // ✅ přímá interakce
        }
        setCurrentSong(song);
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer p-2 border-b border-gray-700 hover:bg-gray-800 transition"
        >
            🎵 {song.title}
        </div>
    );
}
