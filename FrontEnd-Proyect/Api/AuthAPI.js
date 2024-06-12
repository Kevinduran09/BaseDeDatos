import axios from 'axios'


const AuthAPi = axios.create({
    baseURL:'http://127.0.0.1:8000/api/v1/'
})


export const login =async (data)=>{
    try {
        const res = await AuthAPi.post('/login',data)
        console.log(res);
    } catch (error) {
        console.log(error.response.data);
    }
}