import { create } from 'zustand'
import type { StoreApi } from 'zustand'

const VITE_API_URL = import.meta.env.VITE_API_URL

type User = {
    id: string,
    email: string,
    user: string,
    role: string
}

type LoginStore = {
    user: User | null,
    login: (user: User) => void,
    logout: () => void
}

const logout = async (set: StoreApi<LoginStore>['setState']) => {
    try {
        const response = await fetch(`${VITE_API_URL}/admin/logout`, {
            credentials: "include"
        })
        if (response.status === 200) {
            set({ user: null })
        }
        const res = await response.json()
        alert(res.message);
    } catch (error) {
        console.log(`Error at authStore while logging out: ${error}`)
    }
}

export const useLoginStore = create<LoginStore>((set) => ({
    user: null,
    login: (user: User) => set({ user: user }),
    logout: () => logout(set)
}))
