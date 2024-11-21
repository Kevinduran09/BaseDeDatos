import React from "react";
import SignIn from "../components/SignIn/SignIn";
import { Box } from "@mui/material";
export const LoginPage = () => {
  return (
    <>
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <SignIn />
      </Box>
    </>
  );
};
