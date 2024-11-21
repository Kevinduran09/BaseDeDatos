import { useRoutes } from 'react-router-dom';
import { RoutesPublic } from './RoutesPublic';
import { routesPrivate } from './routesPrivate';


export const RoutesApp = () => {
    const routes = useRoutes([
        ...RoutesPublic,
        ...routesPrivate
    ]);

    return routes
};
