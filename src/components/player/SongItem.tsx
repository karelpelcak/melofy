"use client";

import { useAudioPlayer } from "@/context/playerContext";

type Song = {
    title: string;
    url: string;
};

export default function SongItemClient({ song }: { song: Song }) {
    const { playSong } = useAudioPlayer();

    return (
        <div
            onClick={() => playSong(song)}
            className="cursor-pointer p-2 border-b border-gray-700 hover:bg-gray-800 transition"
        >
            🎵 {song.title}
        </div>
    );
}
