import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_URL } from "../service/connection";

type User = {
    id: number;
    nombre: string;
    apellido: string;
    usr: string;
    email: string;
    permisos_id: number;
}

type AuthState = {
    token: string | null;
    user: User | null;
}

type AuthContextValue = {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (usr: string, password: string) => Promise<void>;
    logout: () => void;
    getAuthHeader: () => { Authorization?: string };
};

const STORAGE_KEY = "auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : { token: null, user: null };
        } catch {
            return { token: null, user: null };
        }
    });

    // Persistencia en localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const login = async (usr: string, password: string) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usr, password }),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err?.message || "Credenciales inválidas");
        }

        const data: { token: string; user: User } = await res.json();
        setState({ token: data.token, user: data.user });
    };

    const logout = () => {
        setState({ token: null, user: null });
        localStorage.removeItem(STORAGE_KEY);
        // opcional: pegarle a /api/auth/logout si lo implementaste
    };

    const getAuthHeader = () =>
        state.token ? { Authorization: `Bearer ${state.token}` } : {};

    const value = useMemo<AuthContextValue>(
        () => ({
            token: state.token,
            user: state.user,
            isAuthenticated: !!state.token,
            login,
            logout,
            getAuthHeader,
        }),
        [state]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return ctx;
};
