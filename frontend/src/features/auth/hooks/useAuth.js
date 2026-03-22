import { useDispatch } from "react-redux";
import { register, login, getMe, logout } from "../service/auth.api";
import { setUser, setLoading, setError } from "../slices/auth.slice";

export function useAuth() {


    const dispatch = useDispatch();

    async function handleRegister(username, email, password) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await register(username, email, password);
            return true;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin(email, password) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await login(email, password);
            dispatch(setUser(data.user));
            return true;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed"))
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to fetch user"))
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogout() {
        try {
            dispatch(setLoading(true));
            await logout();
            dispatch(setUser(null));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Logout failed"))
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe,
        handleLogout
    }

}