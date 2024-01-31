import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import { MusicContext } from "../../context/MusicContext"
import { useContext } from 'react';

export default function MusicPlayer() {
    const { currentSong } = useContext(MusicContext)
    return (
        <div className='MusicPlayerContainer'>

            <AudioPlayer
            autoPlay
            src={currentSong}
            // other props here
            volume={0.3}
            showJumpControls={false}
            />
        </div>
    )
}
