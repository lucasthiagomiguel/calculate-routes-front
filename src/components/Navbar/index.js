import React, { useContext } from 'react';
import { Context } from '../../Context/AuthContext';

export const Navbar = () => {

    const { handleLogout } = useContext(Context);

    const dropdownUserNavbar = async () => {
        document.getElementById("dropNavbarUser").classList.toggle("dropdown-menu-action");
    }

    const barsSidebar = async () => {
        document.getElementById("barsSidebar").classList.toggle("sidebar-active");
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="bars" onClick={() => barsSidebar()}>
                    <i className="fas fa-bars"></i>
                </div>
                <img src="/logo.png" alt="celke" className="logo" />
            </div>
            <div className="navbar-content">

                <div className="avatar">
                    <span onClick={() => dropdownUserNavbar()} className="drop-nav-bar-user">
                        <i className="icon fas fa-user"></i>
                    </span>
                    <div id="dropNavbarUser" className="dropdown-menu setting">
                        <div className="item" onClick={handleLogout}>
                            <span className="fas fa-sign-out-alt"></span> Sair
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}