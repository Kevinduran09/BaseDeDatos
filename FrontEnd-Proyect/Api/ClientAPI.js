import axios from "axios";

const ClientsAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/cliente'
});

export const getClients = async ()=>{
    const res = await ClientsAPI.get('/')
    return res
} 

export const createClient = (client) => ClientsAPI.post('/',client)

export const updateClient = (client,id) => ClientsAPI.put(`/${id}`,client)

export const deleteClient = id => ClientsAPI.delete(`/${id}`)


export const getClient = async (id) =>{
    const res = await ClientsAPI.get(`/${id}`)
    return res.data
}