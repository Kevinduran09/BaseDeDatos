import React, { Fragment } from 'react'
import '../../styles/Hero.css'
import {Route, Routes,  } from 'react-router-dom'
import { Eslogan } from './Eslogan'
import { Login } from '../LoginComponents/Login'
import { Register } from '../LoginComponents/Register'

export const Hero = () => {
  return (
    <Fragment>

      <div className='Hero-contenedor'>
        <Routes>
          <Route path="/" exact={true} Component={Eslogan} />
          <Route path="/Login" exact={true} Component={Login} />
          <Route path='/Register' exact={true} Component={Register} />
        </Routes>
     
      </div>


    </Fragment>
  )
}