import React, { useContext } from 'react';
import { Context } from '../../Context/AuthContext';

import { Link } from 'react-router-dom';

export const Sidebar = (props) => {

    const { handleLogout } = useContext(Context);

    return (
        <div id="barsSidebar" className="sidebar">
            
            <Link to="/dashboard" className={props.active === "dashboard" ? "sidebar-nav active" : "sidebar-nav"} ><i className="icon fas fa-tachometer-alt"></i><span> Dashboard</span></Link> 
            
            <Link to="/users" className={props.active === "users" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-users"></i><span>CLientes</span></Link>

            <Link to="/view-route" className={props.active === "profile" ? "sidebar-nav active" : "sidebar-nav"}><i className="icon fas fa-user"></i><span>Rotas</span></Link>

            <Link to="#" onClick={handleLogout} className="sidebar-nav"><i className="icon fas fa-sign-out-alt"></i><span>Sair</span></Link>
        </div>
    )
}