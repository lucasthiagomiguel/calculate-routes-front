import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

import api from '../../config/configApi';

export const ViewRoute = () => {

    const { state } = useLocation();

    const [data, setData] = useState([]);
    const idUser = localStorage.getItem('usersID');

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    useEffect(() => {
        const getRoute = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/optimize-route/" + idUser, headers)
                .then((response) => {
                    if (response.data.client) {
                        setData(response.data.client);
                    } else {
                        setStatus({
                            type: 'redError',
                            mensagem: "Erro: Rota não encontrado!"
                        });
                    }

                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'redError',
                            mensagem: err.response.data.menssage
                        });
                    } else {
                        setStatus({
                            type: 'redError',
                            mensagem: "Erro: Tente mais tarde!"
                        });
                    }
                });
        }

        getRoute();
    },[]);

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="profile" />

                <div className="wrapper">
                    <div className="row">

                        <div className="top-content-adm">
                            <span className="title-content">Rotas</span>
                        </div>
                        <div className="alert-content-adm">
                            {status.type === 'redError' ?
                                <Redirect to={{
                                    pathname: '/dashboard',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                        </div>
                        <div>
                            <small>Rotas ja calculadas na ordem da visita partindo da empresa</small>
                        </div>                   
                        <table className="table-list">
                            <thead className="list-head">
                                <tr>
                                    <th className="list-head-content">ID</th>
                                    <th className="list-head-content">Nome</th>
                                    <th className="list-head-content table-sm-none">E-mail</th>
                                    <th className="list-head-content">Telefone</th>
                                    <th className="list-head-content">Diastancia</th>
                                </tr>
                            </thead>

                            <tbody className="list-body">
                                {data.map(client => (
                                    <tr key={client.id}>
                                        <td className="list-body-content">{client.id}</td>
                                        <td className="list-body-content">{client.name}</td>
                                        <td className="list-body-content table-sm-none">{client.email}</td>
                                        <td className="list-body-content table-sm-none">{client.telefone}</td>
                                        <td className="list-body-content table-sm-none">{client.distancia}KM</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}