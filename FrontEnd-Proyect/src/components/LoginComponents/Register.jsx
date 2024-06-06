import React, { Fragment } from 'react'
import '../../styles/Register.css'

export const Register = () => {
  return (
    <Fragment>
  <div className="register">
  <form className='registerForm'>
  <div className="mb-3 w-100">
    <label for="exampleInputEmail1" className="form-label" >Nombre</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 w-100">
    <label for="exampleInputEmail1" className="form-label" >Apellidos</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 w-100">
    <label for="exampleInputEmail1" className="form-label" >Correo Electronico</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 w-100">
    <label for="exampleInputEmail1" className="form-label" >Telefono 1</label>
    <input type="tel" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 w-100">
    <label for="exampleInputEmail1" className="form-label" >Telefono 2</label>
    <input type="tel" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 w-100">
    <label for="exampleInputEmail1" className="form-label" >Nombre de usuario</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 w-100">
    <label for="exampleInputPassword1" className="form-label">Contraseña</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary">Ingresar</button>
   </form>
</div>
 </Fragment>
  )
}