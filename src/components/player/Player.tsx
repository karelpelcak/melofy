"use client";

import {useAudioPlayer} from "@/context/playerContext";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function Player() {
    const { currentSong } = useAudioPlayer();


    return (
        <div className="absolute w-screen bottom-0">
            <div className="max-w-[90%] h-[100px] md:h-[75px] border-t-2 border-gray-500">
                <AudioPlayer
                    autoPlay
                    src={currentSong?.url}
                    onPlay={e => console.log("onPlay")}
                />
            </div>
        </div>

    );
}



