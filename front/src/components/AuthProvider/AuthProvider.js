import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { signIn, signOut } from "../../apis/auth";
import { AuthContext } from "../../context";

function AuthProvider({ children }) {
    const initialUser = useLoaderData();
    const [user, setUser] = useState(initialUser);

    async function login(credentials) {
        const newUser = await signIn(credentials);
        setUser(newUser);
    }

    async function logout() {
        await signOut();
        setUser(null);
    }

    return <AuthContext.Provider value={{
        user,
        login,
        logout,
    }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;