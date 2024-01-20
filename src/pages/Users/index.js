import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import { servDeleteClient } from '../../services/servDeleteClient';

import useDropdownList from '../../hooks/useDropdownList';

import api from '../../config/configApi';

export const Users = () => {

    const { actionDropdown, closeDropdownAction } = useDropdownList();
    const idUser = localStorage.getItem('usersID');

    const { state } = useLocation();

    const [data, setData] = useState([]);
    const [page, setPage] = useState("");
    const [lastPage, setLastPage] = useState("");

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const getUsers = async (page) => {

        if (page === undefined) {
            page = 1;
        }
        setPage(page);

        const headers = {
            'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }

        await api.get("/client?id_users=" + idUser, headers)
            .then((response) => {
                setData(response.data.client);
                setLastPage(response.data.lastPage);
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.menssage
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: "Erro: Tente mais tarde!"
                    });
                }
            });
    }

    useEffect(() => {
       getUsers();
    }, []);

    const deleteUser = async (idUser) => {
        const response = await servDeleteClient(idUser);

        if (response) {
            setStatus({ type: response.type, mensagem: response.menssage });
            getUsers();
        } else {
            setStatus({
                type: "error",
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
                            <span className="title-content">Listar Usuários</span>
                            <div className="top-content-adm-right">
                                <Link to="/add-user">
                                    <button type="button" className="btn-success">Cadastrar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                            {status.type === 'success' ? <p className="alert-success">{status.mensagem}</p> : ""}
                        </div>

                        <table className="table-list">
                            <thead className="list-head">
                                <tr>
                                    <th className="list-head-content">ID</th>
                                    <th className="list-head-content">Nome</th>
                                    <th className="list-head-content table-sm-none">E-mail</th>
                                    <th className="list-head-content">Telefone</th>
                                    <th className="list-head-content">coordenada_x</th>
                                    <th className="list-head-content">coordenada_y</th>
                                    <th className="list-head-content">Ações</th>
                                </tr>
                            </thead>

                            <tbody className="list-body">
                                {data.map(client => (
                                    <tr key={client.id}>
                                        <td className="list-body-content">{client.id}</td>
                                        <td className="list-body-content">{client.name}</td>
                                        <td className="list-body-content table-sm-none">{client.email}</td>
                                        <td className="list-body-content table-sm-none">{client.telefone}</td>
                                        <td className="list-body-content table-sm-none">{client.coordenada_x}</td>
                                        <td className="list-body-content table-sm-none">{client.coordenada_y}</td>
                                        <td className="list-body-content">
                                            <div className="dropdown-action">
                                                <button onClick={() => { closeDropdownAction(); actionDropdown(client.id) }} className="dropdown-btn-action">Ações</button>
                                                <div id={"actionDropdown" + client.id} className="dropdown-action-item">
                                                    <Link to={"/view-client/" + client.id}>Visualizar</Link>
                                                    <Link to={"/edit-client/" + client.id}>Editar</Link>
                                                    <Link to={"#"} onClick={() => deleteUser(client.id)}>Apagar</Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="content-pagination">
                            <div className="pagination">
                                <Link to="#" onClick={() => getUsers(1)}><i className="fas fa-angle-double-left"></i></Link>

                                {page !== 1 ? <Link to="#" onClick={() => getUsers(page - 1)}>{page - 1}</Link> : ""}

                                <Link to="#" className="active">{page}</Link>

                                {page + 1 <= lastPage ? <Link to="#" onClick={() => getUsers(page + 1)}>{page + 1}</Link> : ""}

                                <Link to="#" onClick={() => getUsers(lastPage)}><i className="fas fa-angle-double-right"></i></Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}