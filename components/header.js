import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link';

import { useSession, signIn, signOut } from "next-auth/react"


const Header = () => {

    const { data: session } = useSession()

    return (
        <header style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "100" }}>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "#aa1e2d" }}>
                <div className="container-fluid">

                    <img 
                        src="https://upload.wikimedia.org/wikipedia/en/5/50/Assumption_University_of_Thailand_%28logo%29.png"
                        width="70"
                        height="70"
                        style={{background:"white", borderRadius:"15px", paddingRight:"1.5px"}}
                    />

                    <a className="navbar-brand" style={{paddingLeft:"15px", fontFamily:"Georgia"}}>AU VR</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" href="/browse">Browse</Link>
                            </li>

                            {/* <li className="nav-item">
                                <Link className="nav-link" href="/gettingStarted">Getting Started</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" href="/story">Start Immersion</Link>
                            </li>

                            {session && (
                                <li className="nav-item">
                                    <Link className="nav-link" href="/admin">Admin</Link>
                                </li>
                            )}

                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown link
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;