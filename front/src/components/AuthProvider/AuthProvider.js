import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { signIn } from "../../apis/auth";
import { AuthContext } from "../../context";

function AuthProvider({ children }) {
    const initialUser = useLoaderData();
    const [user, setUser] = useState(initialUser);
    console.log(initialUser);

    async function login(credentials) {
        const newUser = await signIn(credentials);
        setUser(newUser);
    }

    function logout() {

    }

    return <AuthContext.Provider value={{
        user,
        login,
        logout,
    }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;