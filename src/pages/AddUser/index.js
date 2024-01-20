import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';

import InputMask from 'react-input-mask';

import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';
import api from '../../config/configApi';

export const AddUser = () => {
    const idUser = localStorage.getItem('usersID');

    const [user, setUser] = useState({
        name: '',
        email: '',
        telefone:'',
        coordenada_x:0,
        coordenada_y:0,
        id_users:idUser
        
    });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const valueInput = e => setUser({ ...user, [e.target.name]: e.target.value });

    const addUser = async e => {
        e.preventDefault();

        if (!(await validate())) return;

        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        await api.post('/client', user, headers)
            .then((response) => {
                setStatus({
                    type: 'success',
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
                        mensagem: "Erro: Tente novamente!"
                    });
                }
            });
    }

    async function validate() {
        let schema = yup.object().shape({
            telefone: yup.string("Erro: Necessário preencher o campo telefone")
                .required("Erro: Necessário preencher o campo telefone!")
                .min(11, "Erro: O telefone deve ter no mínimo 11 caracteres!"),
            coordenada_x: yup.number("Erro: Necessário preencher o campo coordenada_x!")
                .required("Erro: Necessário preencher o campo coordenada_x")
                .min(1, "Erro: O coordenada_x deve ter no mínimo 1 caracteres!"),
            coordenada_y: yup.number("Erro: Necessário preencher o campo coordenada_y!")
                .required("Erro: Necessário preencher o campo coordenada_y")
                .min(1, "Erro: O coordenada_y deve ter no mínimo 1 caracteres!"),
            email: yup.string("Erro: Necessário preencher o campo e-mail!")
                .email("Erro: Necessário preencher o campo e-mail!")
                .required("Erro: Necessário preencher o campo e-mail!"),
            name: yup.string("Erro: Necessário preencher o campo nome!")
                .required("Erro: Necessário preencher o campo nome!")
        });

        try {
            await schema.validate({
                name: user.name,
                email: user.email,
                telefone:user.telefone,
                coordenada_x:user.coordenada_x,
                coordenada_y:user.coordenada_y
            });
            return true;
        } catch (err) {
            setStatus({
                type: 'error',
                mensagem: err.errors
            });
            return false;
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
                            <span className="title-content">Cadastrar Client</span>
                            <div className="top-content-adm-right">
                                <Link to="/users">
                                    <button type="button" className="btn-info">Listar</button>
                                </Link>
                            </div>
                        </div>

                        <div className="alert-content-adm">
                            {status.type === 'error' ? <p className="alert-danger">{status.mensagem}</p> : ""}

                            {status.type === 'success' ?
                                <Redirect to={{
                                    pathname: '/users',
                                    state: {
                                        type: "success",
                                        mensagem: status.mensagem
                                    }
                                }} />
                                : ""}
                        </div>

                        <div className="content-adm">
                            <form onSubmit={addUser} className="form-adm">
                                <div className="row-input">
                                    <div className="column">
                                        <label className="title-input">Nome</label>
                                        <input type="text" name="name" id="name" className="input-adm" placeholder="Nome completo do usuário" onChange={valueInput} />
                                    </div>
                                </div>

                                <div className="row-input">

                                    <div className="column">
                                        <label className="title-input">E-mail</label>
                                        <input type="email" name="email" id="email" className="input-adm" placeholder="Melhor e-mail do usuário" onChange={valueInput} />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">Telefone:</label>
                                        <InputMask
                                            mask="(99) 99999-9999"
                                            maskChar="_"
                                            placeholder="(99) 99999-9999"
                                            id="telefone"
                                            name="telefone" 
                                            className="input-adm" 
                                            onChange={valueInput}
                                        />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">coordenada_x</label>
                                        <input type="number" name="coordenada_x" id="coordenada_x" className="input-adm" placeholder="coordenadas X" onChange={valueInput} />
                                    </div>
                                    <div className="column">
                                        <label className="title-input">coordenada_y</label>
                                        <input type="number" name="coordenada_y" id="coordenada_y" className="input-adm" placeholder="coordenadas Y" onChange={valueInput} />
                                        
                                    </div>
                                </div>

                                <button type="submit" className="btn-success">Cadastrar</button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};