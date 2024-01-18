import { User } from "../types";
import * as React from "react";
import { Navigate } from "react-router-dom";

type AuthComponentProps = {
    user: User | undefined;
    children: React.JSX.Element;
};

function AuthComponent(props: AuthComponentProps) {
    const { user, children } = props;

    return user !== undefined ? <Navigate to="/" /> : children;
}

export default AuthComponent;
