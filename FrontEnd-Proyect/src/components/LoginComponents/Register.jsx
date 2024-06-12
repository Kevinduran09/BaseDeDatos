import React, { Fragment } from 'react'
import '../../styles/Register.css'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export const Register = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const handleRegister = (data) => {
    console.log(data);
    // Aquí puedes agregar la lógica para manejar el registro
  }

  return (
    <Fragment>
      <div className="register w-100 d-flex justify-content-center">
        <div className="w-50">
          <div className="text-center mb-3">
            <h2 className='text-white'>Regístrate</h2>
          </div>
          <form className='registerForm' onSubmit={handleSubmit(handleRegister)}>
            <div className="form row">
              <div className="form-group col-md-6">
                <label htmlFor="nombre">Nombre</label>
                <input {...register('nombre', { required: 'Nombre es requerido' })} type="text" className="form-control" id="nombre" />
                {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="apellidos">Apellidos</label>
                <input {...register('apellidos', { required: 'Apellidos son requeridos' })} type="text" className="form-control" id="apellidos" />
                {errors.apellidos && <span className="text-danger">{errors.apellidos.message}</span>}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="telefono1">Teléfono 1</label>
                <input {...register('telefono1', { required: 'Teléfono 1 es requerido' })} type="tel" className="form-control" id="telefono1" />
                {errors.telefono1 && <span className="text-danger">{errors.telefono1.message}</span>}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="telefono2">Teléfono 2</label>
                <input {...register('telefono2', { required: 'Teléfono 2 es requerido' })} type="tel" className="form-control" id="telefono2" />
                {errors.telefono2 && <span className="text-danger">{errors.telefono2.message}</span>}
              </div>
              <div className="form-group col-md-12">
                <label htmlFor="correo">Correo Electrónico</label>
                <input {...register('correo', {
                  required: 'Correo es requerido', pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Correo electrónico no es válido"
                  } })}className="form-control" id="correo" />
                {errors.correo && <span className="text-danger">{errors.correo.message}</span>}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="usuario">Nombre de usuario</label>
                <input {...register('usuario', { required: 'Nombre de usuario es requerido' })} type="text" className="form-control" id="usuario" />
                {errors.usuario && <span className="text-danger">{errors.usuario.message}</span>}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="contrasena">Contraseña</label>
                <input {...register('contrasena', { required: 'Contraseña es requerida' })} type="password" className="form-control" id="contrasena" />
                {errors.contrasena && <span className="text-danger">{errors.contrasena.message}</span>}
              </div>
            </div>
            <div className="mb-3 form-register text-center mt-4">
              <p> <NavLink to="/client/login">Iniciar sesión</NavLink></p>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary px-5">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}
