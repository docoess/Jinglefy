import jinglefyLogo from "../../jinglefy-high-resolution-logo-transparent.png";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user);

  return (
    <div className="navbar-container">
      <NavLink to='/' className="navbar-logo-container">
        <img src={jinglefyLogo} className="navbar-logo"/>
      </NavLink>

      <div className="navbar-link-container">
        <NavLink to="/" className="navbar-link">Home</NavLink>
        <NavLink to="/albums" className="navbar-link">Albums</NavLink>
        <NavLink to="/playlists" className="navbar-link">Playlists</NavLink>

      {user ? 
        (
          <>
          <NavLink to='/albums/new' className="navbar-link">Create Album</NavLink>
            <ProfileButton />
          </>
        )
        :
        (
          <>
            <NavLink to="/signup" className="navbar-link">Sign Up</NavLink>
            <div className="navbar-link">
              <OpenModalMenuItem  itemText="Log In"
                  modalComponent={<LoginFormModal />}
                />
            </div>
          </>
        )
      }
      </div>
    </div>
  );
}

export default Navigation;
