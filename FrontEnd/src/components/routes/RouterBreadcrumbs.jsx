import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useThemeStore } from "../../store/useThemeStore";
const RouterBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x ); // Filtrar "app"
  const disableNavRoutes = ["edit", "asignar", "aplicados", "detalle", 'app', 'ver', 'detalles-solicitud']; // Rutas que no tienen enlace
  const { theme } = useThemeStore()
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "2rem", color: `${theme == 'light' ? 'black' : 'white' }` }} >
      {/* Enlace hacia la página de inicio */} 
      <Link underline="hover" color="inherit" disableNavRoutes component={RouterLink} >
        Inicio
      </Link>

      {/* Iterar sobre las rutas y crear los enlaces o textos correspondientes */}
      {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`; // Crear la ruta completa
        const isLast = index === pathnames.length - 1; // Verificar si es la última parte de la ruta

        if (disableNavRoutes.includes(value) && !isLast) {
          // Si la ruta no es navegable, mostrar solo texto
          return (
            <Typography
              color="inherit"
              key={value}
              style={{ fontWeight: "inherit" }} // Estilo sin negrita
            >
              {value.charAt(0).toUpperCase() + value.slice(1)} {/* Capitalizar la primera letra */}
            </Typography>
          );
        }

        // Si es la última parte, mostrar como texto en negrita
        return isLast ? (
          <Typography
        
            key={value}
            style={{ fontWeight: "bold", color: `${theme == 'light' ? 'black' : 'white'}` }} // Texto en negrita
          >
            {value.charAt(0).toUpperCase() + value.slice(1)} {/* Capitalizar la primera letra */}
          </Typography>
        ) : (
          // Si no es la última parte, mostrar un enlace
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={routeTo}
            key={value}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)} {/* Capitalizar la primera letra */}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default RouterBreadcrumbs;
