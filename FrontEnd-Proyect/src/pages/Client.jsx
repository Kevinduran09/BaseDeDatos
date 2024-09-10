import React from "react";
import { Navbar } from "../components/LandingPageComponents/Navbar";
import { Hero } from "../components/LandingPageComponents/Hero";
import { TituloServicios } from "../components/LandingPageComponents/TituloServicios";
import { Servicios } from "../components/LandingPageComponents/Servicios";

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
  );
};
