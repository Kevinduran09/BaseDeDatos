import React from "react";
import { Outlet, useParams } from "react-router-dom";
export const FormLayout = () => {
   ("fdfd");

  const { entity, id } = useParams();
  return (
    <>
      <p>{`La ruta ${entity} tiene el siguiente id: ${id}`}</p>
      <Outlet />;
    </>
  );
};
