import React, { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

import { servDeleteClient } from '../../services/servDeleteClient';
import api from '../../config/configApi';

export const ViewUser = (props) => {

    const { state } = useLocation();

    const [data, setData] = useState('');
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    useEffect(() => {
        const getUser = async () => {

            const headers = {
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/client/" + id, headers)
                .then((response) => {
                    if (response.data.client) {
                        setData(response.data.client[0]);
                        console.log(response.data.client);
                    } else {
                        setStatus({
                            type: 'redError',
                            mensagem: "Erro: Usuário não encontrado!"
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
                })
        }

        getUser();
    }, [id]);

    const deleteUser = async (idUser) => {
        const response = await servDeleteClient(idUser);

        if (response) {
            if (response.type === "success") {
                setStatus({
                    type: "redSuccess",
                    mensagem: response.mensagem
                });
            } else {
                setStatus({
                    type: response.type,
                    mensagem: response.mensagem
                });
            }
        } else {
            setStatus({
                type: "redError",
                mensagem: "Erro: Tente mais tarde!"
            });
        }
    }

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="users" />

                <div className="wrapper">
                    <div className="row">

                        <div className="top-content-adm">
                            <span className="title-content">Visualizar Usuário</span>
                            <div className="top-content-adm-right">
                                <Link to="/users">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>{" "}

                                <Link to={"/edit-client/" + data.id}>
                                    <button type="button" className="btn-warning">Editar</button>
                                </Link>{" "}

                                <Link to={"#"}>
                                    <button type="button" onClick={() => deleteUser(data.id)} className="btn-danger">Apagar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redSuccess' ?
                                <Redirect to={{
                                    pathname: '/users',
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}

                            {status.type === 'redError' ?
                                <Redirect to={{
                                    pathname: '/users',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">

                            <div className="view-det-adm">
                                <span className="view-adm-title">ID: </span>
                                <span className="view-adm-info">{data.id}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">Nome: </span>
                                <span className="view-adm-info">{data.name}</span>
                            </div>

                            <div className="view-det-adm">
                                <span className="view-adm-title">E-mail: </span>
                                <span className="view-adm-info">{data.email}</span>
                            </div>
                            <div className="view-det-adm">
                                <span className="view-adm-title">Telefone: </span>
                                <span className="view-adm-info">{data.telefone}</span>
                            </div>
                            <div className="view-det-adm">
                                <span className="view-adm-title">Coordenada_x: </span>
                                <span className="view-adm-info">{data.coordenada_x}</span>
                            </div>
                            <div className="view-det-adm">
                                <span className="view-adm-title">Coordenada_y: </span>
                                <span className="view-adm-info">{data.coordenada_y}</span>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}