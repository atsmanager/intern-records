import { create } from 'zustand'
import type { StoreApi } from 'zustand'

const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

type User = {
    id: string,
    email: string,
    user: string,
    role: string,
    company: string,
    planId?: string,
    paymentDate?: string,
    validityDate?: string
}

type LoginStore = {
    user: User | null,
    login: (user: User) => void,
    logout: () => void
}

const logout = async (set: StoreApi<LoginStore>['setState']) => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${VITE_API_URL}/admin/logout`, {
            method: "GET",
            headers: token ? { "Authorization": `Bearer ${token}` } : {},
            credentials: "include"
        });
        const res = await response.json().catch(() => null);
        if (res?.message) {
            console.log(res.message);
        }
    } catch (error) {
        console.log(`Error at authStore while logging out: ${error}`);
    } finally {
        localStorage.removeItem("authToken");
        set({ user: null });
    }
};

export const useLoginStore = create<LoginStore>((set) => ({
    user: null,
    login: (user: User) => set({ user: user }),
    logout: () => logout(set)
}))
