import axios from 'axios';

class AdminAPI {
    constructor() {
        this.AuthAPI = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/v1/administrador'
        });
    }
    

    async getViaje(id){
        try {
            const response = await this.AuthAPI.get(`/viaje/${id}`,{
                headers:{
                    "Authorization":`Bearer ${sessionStorage.getItem('token')}`
                }
            })
            return response.data
        } catch (error) {
            console.error('error al obtener el viaje: ',error)
            throw error;
        }
    }
    async getClients() {
        try {
            const response = await this.AuthAPI.get('/cliente', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            throw error;
        }
    }

    async getVehicles() {
        try {
            const response = await this.AuthAPI.get('/vehiculo', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener vehículos:', error);
            throw error;
        }
    }

    async getRequests() {
        try {
            const response = await this.AuthAPI.get('/solicitud', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
            throw error;
        }
    }

    async getViajes() {
        try {
            const response = await this.AuthAPI.get('/viaje', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener viajes:', error);
            throw error;
        }
    }

    async getEmployes() {
        try {
            const response = await this.AuthAPI.get('/empleado', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener empleados:', error);
            throw error;
        }
    }

    async current() {
        try {
            const response = await this.AuthAPI.options('/current', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener información actual:', error);
            throw error;
        }
    }

    async registerClient(data) {
        try {
            const response = await this.AuthAPI.post('/cliente/register', data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al registrar cliente:', error);
            throw error;
        }
    }

    async deletePhone(id) {
        try {
            const response = await this.AuthAPI.delete(`/telefono/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar teléfono:', error);
            throw error;
        }
    }

    async createClient(data) {
        try {
            const response = await this.AuthAPI.post('/cliente', data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear cliente:', error);
            throw error;
        }
    }
    
    async updateClient(data) {
        try {
            const response = await this.AuthAPI.put(`/cliente/${data.idCliente}`, data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear cliente:', error);
            throw error;
        }
    }

    async deleteClient(id) {
        try {
            const response = await this.AuthAPI.delete(`/cliente/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            throw error;
        }
    }
    async createEmployee(data) {
        try {
            const response = await this.AuthAPI.post('/empleado', data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear cliente:', error);
            throw error;
        }
    }
    
    async updateEmployee(data) {
        try {
            const response = await this.AuthAPI.put(`/empleado/${data.idEmpleado}`, data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear cliente:', error);
            throw error;
        }
    }

    async deleteEmployee(id) {
        try {
            const response = await this.AuthAPI.delete(`/empleado/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            throw error;
        }
    }
    async createVehicle(data) {
        try {
            const response = await this.AuthAPI.post('/vehiculo', data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear cliente:', error);
            throw error;
        }
    }
    
    async updateVehicle(data) {
        try {
            const response = await this.AuthAPI.put(`/vehiculo/${data.idVehiculo}`, data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear cliente:', error);
            throw error;
        }
    }

    async deleteVehicle(id) {
        try {
            const response = await this.AuthAPI.delete(`/vehiculo/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            throw error;
        }
    }

    async createTelefono(data){
        try {
            const response = await this.AuthAPI.post(`/telefono`,data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            throw error;
        }
    }
  async getRequest(id){
      try {
          const response = await this.AuthAPI.get(`/solicitud/${id}`, {
              headers: {
                  'Authorization': `Bearer ${sessionStorage.getItem('token')}`
              }
          });
          return response.data;
      } catch (error) {
          console.error('Error al obtener el recorrido:', error);
          throw error;
      }
  }

    async createRecorrido(data) {
        try {
            const response = await this.AuthAPI.post(`/recorrido`, data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear el recorrido:', error);
            throw error;
        }
    }
    async createViaje(data){
        try {
            const response = await this.AuthAPI.post(`/viaje`, data, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear el viaje:', error);
            throw error;
        }
    }
    async cancelSolicitud(id){
        try {
            const response = await this.AuthAPI.post(`/solicitud/cancel/${id}`,null, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear el viaje:', error);
            throw error;
        }
    }
    async deleteSolicitud(id){
        try {
            const response = await this.AuthAPI.delete(`/solicitud/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear el viaje:', error);
            throw error;
        }
    }
    async getRecorrido(id){
        try {
            const response = await this.AuthAPI.get(`/recorrido/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener el recorrido:', error);
            throw error;
        }
    }
    async getViajesByChofer(id){
        try {
            const response = await this.AuthAPI.get(`viaje/empleado/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener los recorridos de este empleado:', error);
            throw error;
        }
    }
    async deleteViaje(id){
        try {
            const response = await this.AuthAPI.delete(`viaje/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el viaje:', error);
            throw error;
        }
    }
    async getSolicitud(id){
        try {
            const response = await this.AuthAPI.get(`solicitud/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al eliminar el viaje:', error);
            throw error;
        }
    }
    async getViajeByFecha(fecha){
        try {
            const response = await this.AuthAPI.post('viaje/fecha',{'fecha':fecha}, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error al encontrar el viaje:', error);
            throw error;
        }
    }
    async completarRecorrido(id){
        try {
            const response = await this.AuthAPI.post(`recorrido/complete/${id}`,null,{
                headers:{
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
        } catch (error) {
            
        }
    }
}


export default new AdminAPI();
