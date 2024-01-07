import { User } from "./types";
import * as React from "react";
import { Navigate } from "react-router-dom";

type ProtectedComponentProps = {
    user: User | undefined;
    children: React.JSX.Element;
};

function ProtectedComponent(props: ProtectedComponentProps) {
    const { user, children } = props;

    return user === undefined ? <Navigate to="/login" /> : children;
}

export default ProtectedComponent;
