import React, { Fragment } from 'react'
import '../../styles/login.css'
import { NavLink,  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { loginSession, current } from '../../Api/AuthAPI'
import { show_alert } from '../../functions'
import { useAuth } from '../../Providers/AuthProvider'
export const Login = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();
  const { login } = useAuth();

  const handletLogin = async (formdata) => {
    setisLoading(true)
    try {
      const res = await loginSession(formdata)

      if (res) sessionStorage.setItem('token', res.data)
      setisLoading(false)

      try {
        const instance = await current()
        if (instance.data.cargo && instance.data.cargo == 'Administrador') {
          login(instance.data)
          navigate('/admin'); // 
        } else if (instance.data.cargo && instance.data.cargo == 'Chofer'){
          login(instance.data)
          navigate('/admin')
        }else{
          console.log(instance);

          login(instance.data)
          navigate('/client')
        }
        
      } catch (error) {
        console.log(error);

      }


    } catch (error) {
      show_alert('Error al iniciar sesion', 'Error usuario y/0 contraseña incorrectos', 'warning')
      setisLoading(false)
      reset()
    }
  }

  return (
    <Fragment>
      
        <div className="divForm  p-4 px-5 shadow-lg">
          <div className="text-center mb-3">
            <h2 className='text-white'>Inicar Sesion</h2>
          </div>
          <form className='loginForm' onSubmit={handleSubmit(handletLogin)}>
            <div className="mb-3 w-100">
              <label htmlFor="nombreUsuario" className="form-label" >Usuario</label>
              <input {...register('nombreUsuario', { required: 'Nombre de usuario es requerido' })} type="text" className="form-control" id="nombreUsuario" />
              {errors.nombreUsuario && <span className="requiredAlert">{errors.nombreUsuario.message}</span>}
            </div>
            <div className="mb-3 w-100">
              <label htmlFor="passd" className="form-label">Contraseña</label>
              <input {...register('contrasena', { required: "Contraseña es requerida" })} type="password" className="form-control" id="passd" />
              {errors.contrasena && <span className="requiredAlert">{errors.contrasena.message}</span>}
            </div>
            <div className="mb-3 form-register text-center">
              <p> <NavLink to="/client/Register">Resgistrarme ahora </NavLink></p>
            </div>

            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-primary">{isLoading ? 'Iniciando...' : 'Ingresar'} </button>
            </div>
          </form>
        </div>
      
    </Fragment>
  )
}