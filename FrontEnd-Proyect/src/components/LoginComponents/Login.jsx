import React, { Fragment } from 'react'
import '../../styles/login.css'
import { NavLink } from 'react-router-dom'

export const Login = () => {
  return (
    <Fragment>
      <div className="divForm">
<form className='loginForm'>
  <div className="mb-3 w-100">
    <label for="exampleInputEmail1" className="form-label" >Usuario</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 w-100">
    <label for="exampleInputPassword1" className="form-label">Contraseña</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-register">
    <p> <NavLink to="/Register">Resgistrarme ahora </NavLink></p>
  </div>
  <button type="submit" className="btn btn-primary">Ingresar</button>
</form>
</div>
 </Fragment>
  )
}