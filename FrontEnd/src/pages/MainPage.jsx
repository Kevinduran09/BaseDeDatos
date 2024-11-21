import React from "react";
import "../styles/LandingPage.css";
import { Header } from "../components/HomePage/Header";
import { Hero } from "../components/HomePage/Hero";
import { Servicios } from "../components/HomePage/Servicios";
import "../styles/mainPage/landing.css";
import { AnimatePresence, motion } from 'framer-motion'; // Importa framer-motion
export const MainPage = () => {
  return (
    <>
      <AnimatePresence mode='wait'>
        <motion.div
          key={window.location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1}}
          transition={{ duration: 0.2 }}
        >

          <Header />
          <Hero />
          <Servicios />

        </motion.div>
        </AnimatePresence>

    </>
  );
};
