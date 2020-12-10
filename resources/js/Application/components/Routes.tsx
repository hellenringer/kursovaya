import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import IRoutesProps from "../Interfaces/IRoutesProps";
import LoginView from "./Auth/LoginView";
import RegisterView from "./Auth/RegisterView";
import ItemsList from "./Main/ItemsList";
import ProductsPage from "./Products/ProductsPage";

const Routes: React.FC<IRoutesProps> = ({ auth, setAuth }) => {
    return (
        <Switch>
            <Route path="/login" component={(props: JSX.IntrinsicAttributes) =>
                <LoginView auth={auth} setAuth={setAuth} {...props} />
            } />

            <Route component={RegisterView} path="/register" />

            {
                auth
                    ? <>
                        <Route component={ItemsList} path="/" exact />
                        <Route component={ProductsPage} path="/products" />
                    </>
                    : <Redirect to='/login' />
            }
        </Switch>
    )
}

export default Routes;
