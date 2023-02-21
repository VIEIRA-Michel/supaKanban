import { useSetRecoilState } from "recoil";
import { signIn, signOut, checkIsAuth } from '../apis/auth';
import { createUser, changePassword } from '../apis/users';
import { userState } from '../recoil';


export function useUserActions() {
    const setUserData = useSetRecoilState(userState);
    return {
        register,
        login,
        logout,
        checkUserIsConnected
    }

    async function register(user) {
        try {
            const result = await createUser(user);
            console.log(result);
            setUserData(result);
        } catch (e) {
            return console.log(e)
        }
    }

    async function login(credentials) {
        try {
            const user = await signIn(credentials);
            setUserData(user);
        } catch (e) {
            return console.log(e);
        }
    }

    async function logout() {
        try {
            await signOut();
            setUserData(null);
        } catch (e) {
            return console.log(e);
        }
    }

    async function checkUserIsConnected() {
        try {
            const { user } = await checkIsAuth();
            setUserData(user);
        } catch (e) {
            return console.log(e);
        }
    }
}