import React, { Fragment } from 'react'
import '../../styles/Register.css'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { registerClient } from '../../../Api/AuthAPI'
import { showMsj, show_alert } from '../../functions'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const navegate = useNavigate()

  const handleRegister = async (data) => {
    try {
      console.log(data);
      const res = await registerClient(data);
      console.log(res);
      if (res) {
        showMsj('Registrado con exito')
        navegate('/client/login')
      }
    } catch (error) {
      show_alert('Error al Registrarse', '', 'warning')
    }
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
                <label htmlFor="apellido">Apellido</label>
                <input {...register('apellido', { required: 'Apellido es requerido' })} type="text" className="form-control" id="apellido" />
                {errors.apellido && <span className="text-danger">{errors.apellido.message}</span>}
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

              <div className="form-group col-md-6">
                <label htmlFor="cedula">Cedula</label>
                <input {...register('cedula', { required: 'Cedula es requerido' })} className="form-control" id="cedula" />
                {errors.cedula && <span className="text-danger">{errors.cedula.message}</span>}
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="direccion">Dirección</label>
                <input {...register('direccion', { required: 'Dirección es requerida' })} type="text" className="form-control" id="direccion" />
                {errors.direccion && <span className="text-danger">{errors.direccion.message}</span>}
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
                <input {...register('fechaIngreso', { required: 'Fecha de Ingreso es requerida' })} type="date" className="form-control" id="fechaIngreso" />
                {errors.fechaIngreso && <span className="text-danger">{errors.fechaIngreso.message}</span>}
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="correo">Correo Electrónico</label>
                <input {...register('correoElectronico', {
                  required: 'Correo es requerido', pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Correo electrónico no es válido"
                  }
                })} className="form-control" id="correo" />
                {errors.correoElectronico && <span className="text-danger">{errors.correoElectronico.message}</span>}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="usuario">Nombre de usuario</label>
                <input {...register('nombreUsuario', { required: 'Nombre de usuario es requerido' })} type="text" className="form-control" id="usuario" />
                {errors.nombreUsuario && <span className="text-danger">{errors.nombreUsuario.message}</span>}
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
