import { NavLink } from "react-router-dom"

export default function LandingPage() {
    return (
        <>
            <h1>Welcome!</h1>
            <NavLink to='/albums'>View all albums</NavLink>
        </>
    )
}