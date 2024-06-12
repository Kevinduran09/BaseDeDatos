import React, { Fragment } from 'react'
import '../../styles/login.css'
import { NavLink } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { login } from '../../../Api/AuthAPI'
export const Login = () => {
  const {register,formState={errors},handleSubmit,reset} = useForm();

  const handletLogin =(formdata)=>{
    login(formdata)
  }

  return (
    <Fragment>
      <div className="divForm">
        <form className='loginForm' onSubmit={handleSubmit(handletLogin)}>
          <div className="mb-3 w-100">
            <label for="nombreUsuario" className="form-label" >Usuario</label>
            <input {...register('nombreUsuario')} type="text" className="form-control" id="nombreUsuario" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 w-100">
            <label for="passd" className="form-label">Contraseña</label>
            <input {...register('contrasena')} type="password" className="form-control" id="passd" />
          </div>
          <div className="mb-3 form-register">
            <p> <NavLink to="/client/Register">Resgistrarme ahora </NavLink></p>
          </div>
          <button type="submit" className="btn btn-primary">Ingresar</button>
        </form>
      </div>
    </Fragment>
  )
}