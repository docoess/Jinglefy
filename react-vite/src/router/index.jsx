import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import AllAlbums from '../components/AllAlbums/AllAlbums';
import OneAlbum from '../components/OneAlbum/OneAlbum';
import Layout from './Layout';
import NewAlbum from '../components/NewAlbum/NewAlbum';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
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
      }
    ],
  },
]);
