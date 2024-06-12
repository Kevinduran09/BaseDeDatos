import axios from "axios";

const ClientsAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/cliente'
});
export const createClient = (client) => ClientsAPI.post('/',client)

export const updateClient = (client,id) => ClientsAPI.put(`/${id}`,client)

export const deleteClient = id => ClientsAPI.delete(`/${id}`)


export const getClient = async (id) =>{
    const res = await ClientsAPI.get(`/${id}`)
    return res.data
}
export const getDestinos = async () => {
    const res = await ClientsAPI.get('/destinos');
    
    return res
}
export const getServicios = async ()=>{
    const res = await ClientsAPI.get('/servicio');
    return res
}
export const postsolicitud = async (data)=>{
    const res = await ClientsAPI.post(`/solicitud/${data.cliente}`, data,{
        headers:
        {
            'Authorization' : `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    return res
}