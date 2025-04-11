"use client";


import {useAudioPlayer} from "@/context/playerContext";

type Song = {
    title: string;
    url: string;
};

export default function SongItemClient({ song }: { song: Song }) {
    const { playSong } = useAudioPlayer();

    return (
        <div onClick={() => playSong(song)} className="cursor-pointer p-1 border-2 border-gray-200">
            🎵 {song.title}
        </div>
    );
}
