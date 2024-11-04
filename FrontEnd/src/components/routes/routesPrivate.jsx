import { AdminPage } from "../../pages/AdminPage";
import { ProtectedRouter } from "./ProtectedRouter";
import { Dashboard } from "../dashboard/Dashboard";
import { ClientDetailForm } from "../client/ClientDetailForm";
import { Client } from "../client/Client";
import { Employe } from "../employe/Employe";
import { EmployeDetailForm } from "../employe/EmployeDetailForm";
import { Vehicle } from "../vehicle/Vehicle";
import { VehicleDetailForm } from "../vehicle/VehicleDetailForm";
import { Solicitud } from "../request/Solicitud";
import { Viaje } from "../route/Viaje";
import { ErrorRoute } from "./ErrorRoute";
export const routesPrivate =[
    {
        path:'/app',
        element: <ProtectedRouter element={<AdminPage/>}  />,
        children:[
            { path: "dashboard", element: <Dashboard /> },
            { path: "clients/:id", element: <ClientDetailForm /> },
            { path: "clients", element: <Client /> },
            { path: "employes", element: <Employe /> },
            { path: "employes/:id", element: <EmployeDetailForm /> },
            { path: "vehicles", element: <Vehicle /> },
            { path: "vehicles/:id", element: <VehicleDetailForm /> },
            { path: "requests", element: <Solicitud /> },
            { path: "routes", element: <Viaje /> },

            { path: "*", element: <ErrorRoute /> },
        ]
    }
]