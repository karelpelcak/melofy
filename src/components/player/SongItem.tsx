"use client";


import {useAudioPlayer} from "@/context/playerContext";

type Song = {
    title: string;
    url: string;
};

export default function SongItemClient({ song }: { song: Song }) {
    const { playSong } = useAudioPlayer();

    return (
        <div onClick={() => playSong(song)} style={{ cursor: "pointer" }}>
            🎵 {song.title}
        </div>
    );
}
