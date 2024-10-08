import React from "react";
import "../styles/LandingPage.css";
import { Header } from "../components/HomePage/Header";
import { Hero } from "../components/HomePage/Hero";
import { Servicios } from "../components/HomePage/Servicios";
import "../styles/mainPage/landing.css";
export const MainPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Servicios />
    </>
  );
};
