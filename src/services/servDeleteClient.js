import api from '../config/configApi';

export const servDeleteClient = async (idClient) => {

    var status = false;

    const headers = {
        'headers': {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    await api.delete("/client/" + idClient, headers)
        .then((response) => {
            status = {
                type: 'success',
                mensagem: response.data.menssage
            };
        }).catch((err) => {
            if (err.response) {
                status = {
                    type: 'error',
                    mensagem: err.response.data.menssage
                };
            } else {
                status = {
                    type: 'error',
                    mensagem: "Erro: Tente mais tarde!"
                };
            }
        });

    return status;
}