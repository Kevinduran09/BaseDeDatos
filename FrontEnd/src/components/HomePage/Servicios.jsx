import React, { Fragment } from "react";
import Servicio1 from "../../assets/Servicio1.jpg";
import Servicio2 from "../../assets/Servicio2.jpg";
import Servicio3 from "../../assets/Servicio3.jpg";

export const Servicios = () => {
  return (
    <>
      <div className="servicios container-services">
        <div className="titulo-servicios">
          <h2>SERVICIOS</h2>
        </div>
        <div className="servicios">
          <div className="servicio">
            <img src={Servicio1} alt="" />
            <div className="descripcion">
              <p>Cash in Transit</p>
            </div>
          </div>

          <div className="servicio">
            <img src={Servicio2} alt="" />
            <div className="descripcion">
              <p>Cash Managament Solutions</p>
            </div>
          </div>

          <div className="servicio">
            <img src={Servicio3} alt="" />
            <div className="descripcion">
              <p>Cash Technology</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
