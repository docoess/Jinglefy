import { NavLink } from "react-router-dom";
import "../AllAlbums/AllAlbums.css";
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className="landing-page-container">
            <h1 className="landing-h1" >Welcome to Jinglefy!</h1>
            <h2>Made by Azad Celik, Derek Slayton, Donald Roessler, and Elliot Starr</h2>

            <NavLink to='/albums'>View all albums</NavLink>
        </div>
    )
}
