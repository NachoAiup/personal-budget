import { Suspense } from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import Layout from "../components/commons/Layout";
import Loader from "../components/commons/Loader";
import NuevoUsuario from "./user/NuevoUsuario";
import Login from "./user/Login";
import Inicio from "./app/Inicio";
import NotFound from "./user/NotFound";
import { USER_ROUTES } from "./user/constants";
import { APP_ROUTES } from "./app/constants";

const Routes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ReactRouterRoutes>
        <Route path={USER_ROUTES.LOGIN} element={<Layout />}>
          <Route index element={<Login />} />
          <Route path={APP_ROUTES.INICIO} element={<Inicio />} />
          <Route path={USER_ROUTES.NUEVO_USUARIO} element={<NuevoUsuario />} />
          {/* url doesnt exist */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </ReactRouterRoutes>
    </Suspense>
  );
};

export default Routes;
