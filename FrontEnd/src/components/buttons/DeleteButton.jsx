import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
export const DeleteButton = ({ handleDelete, id }) => {
  const handletDel = () => {
    handleDelete(id);
  };
  return (
    <>
      <Button
        startIcon={<DeleteIcon />}
        variant="contained"
        color="error"
        onClick={handletDel}
      >
        Eliminar
      </Button>
    </>
  );
};
