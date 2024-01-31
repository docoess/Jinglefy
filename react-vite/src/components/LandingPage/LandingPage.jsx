import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import { NavLink } from "react-router-dom";
import "../AllAlbums/AllAlbums.css";
import './LandingPage.css';
import { useSelector } from "react-redux";

export default function LandingPage() {
    const user = useSelector(state => state.session.user)
    const userCheck = () => {
        if(user == null) {
            return <>
            <NavLink to='/signup' className={"landing-button"}>Create Your Jinglefy account!</NavLink>
            <OpenModalMenuItem  itemText="Log In"
                    modalComponent={<LoginFormModal />} className={"landing-button"}
                    />
            </>
        }
    }

    return (
        <div className="landing-page-container">
            <h1 className="landing-h1" >Welcome to Jinglefy!</h1>
            <img className="landing-image" src={'https://cdn.pixabay.com/photo/2017/06/09/06/07/record-player-2385850_1280.png'} />
            <h2>Made by <a href="https://github.com/Azadcelik">Azad Celik</a>, <a href="https://github.com/Dslayton1998">Derek Slayton</a>, <a href="https://github.com/docoess">Donald Roessler</a>, and <a href="https://github.com/estarr626">Elliot Starr</a></h2>


            <div className="landing-buttons">
                <NavLink to='/albums' className={"landing-button fake-button"}>View all albums</NavLink>
                {userCheck()}
            </div>

        </div>
    )
}
