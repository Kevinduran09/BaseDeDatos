import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";
export const RouterApp = () => {
  const elements = useRoutes(routes);
  return (
    <>
      <Router>{elements}</Router>
    </>
  );
};
