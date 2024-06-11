import React from 'react'
import {Navbar} from '../LandingPageComponents/Navbar'
import {Hero} from '../LandingPageComponents/Hero'
import {TituloServicios} from '../LandingPageComponents/TituloServicios'
import {Servicios} from '../LandingPageComponents/Servicios'
export const LandingPage = () => {
  return (
   <>
          <Navbar />
          <div className="content">
              <Hero />
              <TituloServicios />
              <Servicios />
          </div>
   </>
        
  )
}
