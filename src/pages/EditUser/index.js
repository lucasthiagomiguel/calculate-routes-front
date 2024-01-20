import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';
import { servDeleteClient } from '../../services/servDeleteClient';

export const EditUser = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [coordenada_x, setCoordenada_x] = useState('');
    const [coordenada_y, setCoordenada_y] = useState('');
    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const editUser = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }

        await api.put("/client/" + id, { id, name, email,telefone, coordenada_x, coordenada_y }, headers)
            .then((response) => {
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.data.menssage
                });
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.menssage
                    });
                } else {
                    setStatus({
                        type: 'error',
                        mensagem: 'Erro: Tente mais tarde!'
                    });
                }
            });
    }

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
                        setName(response.data.client[0].name);
                        setEmail(response.data.client[0].email);
                        setTelefone(response.data.client[0].telefone);
                        setCoordenada_x(response.data.client[0].coordenada_x);
                        setCoordenada_y(response.data.client[0].coordenada_y);
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Usuário não encontrado!"
                        });
                    }

                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: 'redWarning',
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: 'redWarning',
                            mensagem: "Erro: Tente mais tarde!"
                        });
                    }
                })
        }

        getUser();
    }, [id]);

    async function validate() {
        let schema = yup.object().shape({
            telefone: yup.string("Erro: Necessário preencher o campo telefone")
                .required("Erro: Necessário preencher o campo telefone!")
                .min(11, "Erro: O telefone deve ter no mínimo 11 caracteres!"),
            coordenada_x: yup.string("Erro: Necessário preencher o campo coordenada_x!")
                .required("Erro: Necessário preencher o campo coordenada_x")
                .min(1, "Erro: O coordenada_x deve ter no mínimo 1 caracteres!"),
            coordenada_y: yup.string("Erro: Necessário preencher o campo coordenada_y!")
                .required("Erro: Necessário preencher o campo coordenada_y")
                .min(1, "Erro: O coordenada_y deve ter no mínimo 1 caracteres!"),
            email: yup.string("Erro: Necessário preencher o campo e-mail!")
                .email("Erro: Necessário preencher o campo e-mail!")
                .required("Erro: Necessário preencher o campo e-mail!"),
            name: yup.string("Erro: Necessário preencher o campo nome!")
                .required("Erro: Necessário preencher o campo nome!")
        });

        try {
            await schema.validate({ name, email, telefone, coordenada_x,coordenada_y });
            return true;
        } catch (err) {
            setStatus({ type: 'error', mensagem: err.errors });
            return false;
        }
    }

    const deleteUser = async (idUser) => {
        const response = await servDeleteClient(idUser);
        if (response) {
            if (response.type === "success") {
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.mensagem
                });
            } else {
                setStatus({
                    type: "error",
                    mensagem: response.mensagem
                });
            }
        } else {
            setStatus({
                type: 'error',
                mensagem: 'Erro: Tente mais tarde!'
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
                            <span className="title-content">Editar Usuário</span>
                            <div className="top-content-adm-right">
                                <Link to="/users">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>{" "}
                                <Link to={"/view-client/" + id}>
                                    <button type="button" className="btn-primary">Visualizar</button>
                                </Link>{" "}
                                <Link to="#">
                                    <button type="button" className="btn-danger" onClick={() => deleteUser(id)}>Apagar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'redWarning' ?
                                <Redirect to={{
                                    pathname: '/users',
                                    state: {
                                        type: "error",
                                        mensagem: status.mensagem
                                    }
                                }} /> : ""}
                            {status.type === 'redSuccess' ? <Redirect to={{
                                pathname: '/users',
                                state: {
                                    type: "success",
                                    mensagem: status.mensagem
                                }
                            }} /> : ""}
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={editUser} className="form-adm">

                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Nome</label>
                                        <input type="text" name="name" id="name" className="input-adm" placeholder="Nome completo do usuário" value={name} onChange={text => setName(text.target.value)} />
                                    </div>
                                </div>

                                <div className="row-input">

                                    <div className="column">
                                        <label className="title-input">E-mail</label>
                                        <input type="email" name="email" id="email" className="input-adm" placeholder="Melhor e-mail do usuário" value={email} onChange={text => setEmail(text.target.value)} />
                                    </div>

                                </div>
                                <div className="row-input">

                                    <div className="column">
                                        <label className="title-input">Telefone</label>
                                        <InputMask
                                            mask="(99) 99999-9999"
                                            maskChar="_"
                                            placeholder="(99) 99999-9999"
                                            id="telefone"
                                            name="telefone" 
                                            className="input-adm" 
                                            value={telefone} onChange={text => setTelefone(text.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="row-input">

                                    <div className="column">
                                        <label className="title-input">Coordenada_x</label>

                                        <input type="number" name="coordenada_x" id="coordenada_x" className="input-adm" placeholder="coordenadas X" value={coordenada_x} onChange={text => setCoordenada_x(text.target.value)} />
                                    </div>

                                </div>
                                <div className="row-input">

                                    <div className="column">
                                        <label className="title-input">E-mail</label>
                                        <input type="number" name="coordenada_y" id="coordenada_y" className="input-adm" placeholder="coordenadas Y" value={coordenada_y} onChange={text => setCoordenada_y(text.target.value)} />
                                    </div>

                                </div>

                                <button type="submit" className="btn-warning">Salvar</button>

                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}