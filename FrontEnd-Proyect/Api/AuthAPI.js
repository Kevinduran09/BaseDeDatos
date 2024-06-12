import axios from 'axios'


const AuthAPi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/'
})


export const login = async (data) => {

   const res = await AuthAPi.post('/login', data)
    console.log(res);
    return res
}
export const current = async ()=>{
    const res = await AuthAPi.options('/current',{
        headers:{
            'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Agrega el token al encabezado Authorization
        }
    })
}