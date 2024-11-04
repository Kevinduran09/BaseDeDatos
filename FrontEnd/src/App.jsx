// import { RoutesApp } from "./components/routes/RoutesApp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import { RoutesApp } from "./components/routes/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: 1000 * 60, // Reconsulta cada minuto
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          {/* <RoutesApp /> */}
          <RoutesApp/>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
