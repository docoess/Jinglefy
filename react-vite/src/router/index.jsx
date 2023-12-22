import CreatePlaylistPage from '../components/CreatePlaylistPage/CreatePlaylistPage';
import CreateSongForm from '../components/CreateSongForm/CreateSongForm';
import UpdatePlaylist from '../components/UpdatePlaylist/UpdatePlaylist';
import UpdateAlbums from '../components/UpdateAlbums/UpdateAlbums';
import AllPlaylists from '../components/AllPlaylists/AllPlaylists';
import LandingPage from '../components/LandingPage/LandingPage';
import OnePlaylist from '../components/OnePlaylist/OnePlaylist';
import SignupFormPage from '../components/SignupFormPage';
import AllAlbums from '../components/AllAlbums/AllAlbums';
import LoginFormPage from '../components/LoginFormPage';
import { createBrowserRouter } from 'react-router-dom';
import OneAlbum from '../components/OneAlbum/OneAlbum';
import NewAlbum from '../components/NewAlbum/NewAlbum';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "login",
        element: <LoginFormPage />
      },
      {
        path: "signup",
        element: <SignupFormPage />
      },
      {
        path: "albums",
        element: <AllAlbums />
      },
      {
        path: "albums/:albumId",
        element: <OneAlbum />
      },
      {
        path: "albums/new",
        element: <NewAlbum />
      },
      {
        path : "albums/:albumId/update",
        element: <UpdateAlbums />
      },
      {
        path: "albums/:albumId/new-song",
        element: <CreateSongForm />
      },
      {
        path: "playlists",
        element: <AllPlaylists />
      },
      {
        path: "playlists/:playlistId",
        element: <OnePlaylist />
      }, 
      {
        path: "playlists/new",
        element: <CreatePlaylistPage />
      }, 
      {
        path: "playlists/:playlistId/update",
        element: <UpdatePlaylist />
      }
    ],
  },
]);
