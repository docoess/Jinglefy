import { NavLink } from "react-router-dom"

export default function LandingPage() {
    return (
        <>
            <h1>Welcome to [spotify clone name here]!</h1>
            <h2>Made by Azad Celik, Derek Slayton, Donald Roessler, and Elliot Starr</h2>
            
            <NavLink to='/albums'>View all albums</NavLink>
        </>
    )
}
