import { NavLink } from "react-router-dom";
import "../AllAlbums/AllAlbums.css";

export default function LandingPage() {
    return (
        <>
            <h1>Welcome to Jinglefy!</h1>
            <h2>Made by Azad Celik, Derek Slayton, Donald Roessler, and Elliot Starr</h2>

            <NavLink to='/albums'>View all albums</NavLink>
        </>
    )
}
