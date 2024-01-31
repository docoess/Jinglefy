import Navigation from "../components/Navigation/Navigation";
import { ModalProvider, Modal } from "../context/Modal";
import { MusicProvider } from "../context/MusicContext"
import { thunkAuthenticate } from "../redux/session";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <MusicProvider>
        <ModalProvider>
            <Navigation />
              {isLoaded && <Outlet />}
            <MusicPlayer />
          <Modal />
        </ModalProvider>
      </MusicProvider>
    </>
  );
}
