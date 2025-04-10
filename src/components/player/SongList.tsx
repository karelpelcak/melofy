'use server'

import {DB} from "@/lib/DB";
import SongItemClient from "@/components/player/SongItem";

const SongList = async () => {
    const songList = await DB.song.findMany({
        select: {
            id: true,
            file: true,
            url: true,
        }
    });

    return (
        <div>
           <ul>
               {!!songList && (
                   songList.map((song) => (
                       <SongItemClient key={song.id} song={{
                           url: song.url,
                           title: song.file
                       }} />
                   ))
               )}
           </ul>
        </div>
    )
}

export default SongList;