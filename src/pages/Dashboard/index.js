import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

export const Dashboard = () => {

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="dashboard" />

                <div className="wrapper">
                    <div className="row">
                        <div className="box box-first">
                            <span className="fas fa-users"></span>
                            <span>10</span>
                            <span>Usuários</span>
                        </div>

                        <div className="box box-second">
                            <span className="fas fa-truck-loading"></span>
                            <span>43</span>
                            <span>Entregas</span>
                        </div>

                        <div className="box box-third">
                            <span className="fas fa-check-circle"></span>
                            <span>12</span>
                            <span>Rotas</span>
                        </div>

                        <div className="box box-fourth">
                            <span className="fas fa-exclamation-triangle"></span>
                            <span>3</span>
                            <span>Alertas</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}