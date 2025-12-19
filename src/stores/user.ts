import { create } from "zustand";
import axios from "axios";

// Define the User interface based on usage in admin/page.tsx
export interface User {
    _id: string;
    Fullname: string;
    Email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface UserState {
    users: User[];
    error: any;
    loading: boolean;
    fetchUser: () => Promise<void>;
}

const useUserStore = create<UserState>((set) => ({
    users: [],
    error: null,
    loading: false,
    fetchUser: async () => {
        set({ loading: true });
        try {
            // Using relative path to use Next.js API routes or proxy
            const response = await axios.get("/api/users");
            const Users = response.data;
            // Ensure users is always an array
            set({ users: Users, loading: false });

        } catch (error) {
            set({ error: error, loading: false });
        }
    }
}));

export default useUserStore;