import { NavLink } from "react-router-dom";
import "../AllAlbums/AllAlbums.css";
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className="landing-page-container">
            <h1 className="landing-h1" >Welcome to Jinglefy!</h1>
            <h2>Made by <a href="https://github.com/Azadcelik">Azad Celik</a>, <a href="https://github.com/Dslayton1998">Derek Slayton</a>, <a href="https://github.com/docoess">Donald Roessler</a>, and <a href="https://github.com/Heecher626">Elliot Starr</a></h2>

            <NavLink to='/albums'>View all albums</NavLink>
        </div>
    )
}
