import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";
import jinglefyLogo from "../../../public/jinglefy-high-resolution-logo-transparent.png"

function Navigation() {
  const user = useSelector((store) => store.session.user);
  return (
    <div className="navbar-container">

      <div className="navbar-logo-container">
        <img src={jinglefyLogo} className="navbar-logo"/>
      </div>

      <div className="navbar-link-container">
        <NavLink to="/" className="navbar-link">Home</NavLink>


      <NavLink to="/albums" className="navbar-link">Albums</NavLink>
      <NavLink to="/playlists" className="navbar-link">Playlists</NavLink>

      {user ? (
        <>
          <ProfileButton />
        </>
        )
        :
        (
          <>
            <NavLink to="/signup" className="navbar-link">Sign Up</NavLink>
            <NavLink to="/login" className="navbar-link">Log In</NavLink>
          </>
        )
      }
      </div>


    </div>
  );
}

export default Navigation;
