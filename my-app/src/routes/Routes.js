import { Suspense } from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import Layout from "../components/commons/Layout";
import Loader from "../components/commons/Loader";
import Register from "./user/Register";
import Login from "./user/Login";
import Home from "./app/Home";
import NotFound from "./user/NotFound";
import { USER_ROUTES } from "./user/constants";
import { APP_ROUTES } from "./app/constants";
import NewTransaction from "./app/NewTransaction";
import TransactionQuery from "./app/TransactionQuery/TransactionQuery";

const Routes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ReactRouterRoutes>
        <Route path={USER_ROUTES.LOGIN} element={<Layout />}>
          <Route index element={<Login />} />
          <Route path={APP_ROUTES.HOME} element={<Home />} />
          <Route
            path={APP_ROUTES.NEW_TRANSACTION}
            element={<NewTransaction />}
          />
          <Route
            path={APP_ROUTES.TRANSACTION_QUERY}
            element={<TransactionQuery />}
          />
          <Route path={USER_ROUTES.REGISTER} element={<Register />} />
          {/* url doesnt exist */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </ReactRouterRoutes>
    </Suspense>
  );
};

export default Routes;
