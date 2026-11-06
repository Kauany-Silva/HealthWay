
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const RotasPrivadas = () => {
    const { user, token, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return null;
    }

    // Verifica se existe usuário e token
    if (!user || !token) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};
