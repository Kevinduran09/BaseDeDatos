import React from "react";
import SignIn from "../components/SignIn/SignIn";
import { Box } from "@mui/material";
export const LoginPage = () => {
  return (
    <>
      <Box height="100vh" bgcolor="#fdfdff" className="">
        <SignIn />
      </Box>
    </>
  );
};
