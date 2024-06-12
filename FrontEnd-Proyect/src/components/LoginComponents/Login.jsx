import React, { Fragment } from 'react'
import '../../styles/login.css'
import { NavLink } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useState } from 'react'
import { login } from '../../../Api/AuthAPI'
import { show_alert } from '../../functions'
export const Login = () => {
  const {register,formState:{errors},handleSubmit,reset} = useForm();
  const [isLoading, setisLoading] = useState(false)
  const handletLogin =async (formdata)=>{
    setisLoading(true)
    try {
        const res = await login(formdata)
        if(res){
          sessionStorage.setItem('token',res.data)
          
        }
    } catch (error) {
      show_alert('Error al iniciar sesion', 'Error usuario y/0 contraseña incorrectos','warning')
      setisLoading(false)
    }
  }

  return (
    <Fragment>
      <div className="divForm">
        <form className='loginForm' onSubmit={handleSubmit(handletLogin)}>
          <div className="mb-3 w-100">
            <label htmlFor="nombreUsuario" className="form-label" >Usuario</label>
            <input {...register('nombreUsuario',{required:'Nombre de usuario es requerido'})} type="text" className="form-control" id="nombreUsuario"  />
            {errors.nombreUsuario && <span className="requiredAlert">{errors.nombreUsuario.message}</span>}
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="passd" className="form-label">Contraseña</label>
            <input {...register('contrasena',{required:"Contraseña es requerida"})} type="password" className="form-control" id="passd" />
            {errors.contrasena && <span className="requiredAlert">{errors.contrasena.message}</span>}
          </div>
          <div className="mb-3 form-register">
            <p> <NavLink to="/client/Register">Resgistrarme ahora </NavLink></p>
          </div>
        
          <button type="submit" className="btn btn-primary">{isLoading ? 'Iniciando...':'Ingresar'} </button> 
        </form>
      </div>
    </Fragment>
  )
}