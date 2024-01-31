import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';

export const MusicContext = createContext();

export function MusicProvider({ children }) {
    const musicRef = useRef()
    const [currentSong, setCurrentSong] = useState(null)

    const contextValue = {
        musicRef,
        currentSong,
        setCurrentSong
    }

    return (
        <MusicContext.Provider value={contextValue}>
            {children}
        </MusicContext.Provider>
    )
}
