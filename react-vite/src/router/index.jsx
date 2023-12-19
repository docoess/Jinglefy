import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllAlbums from '../components/AllAlbums/AllAlbums';
import OneAlbum from '../components/OneAlbum/OneAlbum';
import Layout from './Layout';
import NewAlbum from '../components/NewAlbum/NewAlbum';
import LandingPage from '../components/LandingPage/LandingPage';
import UpdateAlbums from '../components/UpdateAlbums/UpdateAlbums';
import CreateSongForm from '../components/CreateSongForm/CreateSongForm';

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
      }
    ],
  },
]);
