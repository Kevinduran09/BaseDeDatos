import React from 'react'
import { Navbar } from '../LandingPageComponents/Navbar'
import { Hero } from '../LandingPageComponents/Hero'
import { TituloServicios } from '../LandingPageComponents/TituloServicios'
import { Servicios } from '../LandingPageComponents/Servicios'
import { AuthProvider } from '../../Providers/AuthProvider'
export const LandingPage = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
      </AuthProvider>

      <div className="content">
        <Hero />
        <TituloServicios />
        <Servicios />
      </div>
    </>

  )
}
