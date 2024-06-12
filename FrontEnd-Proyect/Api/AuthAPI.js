import axios from 'axios'


const AuthAPi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/'
})


export const login = async (data) => {

   return await AuthAPi.post('/login', data)

}
export const current = async ()=>{
    return await AuthAPi.options('/current',{
        headers:{
            'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Agrega el token al encabezado Authorization
        }
    })
}