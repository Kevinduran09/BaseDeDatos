import { Alert } from "@mui/material";

export const NoFiles = () => {
  return (
    <>
      <div
        style={{
          display: "grid",
          alignItems: "center",
          height: "100%",
          margin: "0 2rem",
        }}
      >
        <Alert variant="filled" severity="info" sx={{ borderRadius: 0 }}>
          No hay registros
        </Alert>
      </div>
    </>
  );
};
