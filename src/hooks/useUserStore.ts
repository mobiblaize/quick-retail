import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Permission {
  id: number;
  name: string;
  display_name: string;
  description: string;
  group: string;
  module: string;
}

export interface Role {
  id: number;
  name: string;
  display_name: string;
  description: string;
  permissions?: Permission[];
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  security_question: string;
  roles?: Role[];
  locations?: Array<{
    id: number;
    locationID: string;
    name: string;
  }>;
  tenants?: Array<{
    uuid: string;
    name: string;
    logo: string | null;
    domain: string;
  }>;
  profile_picture?: string;
  phone_number?: string;
  [key: string]: unknown;
}

interface UserStore {
  user: User | null;
  permissions: Permission[];
  setUser: (user: User) => void;
  setPermissions: (permissions: Permission[]) => void;
  clearUser: () => void;
  hasPermission: (permissionName: string) => boolean;
  isAdmin: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      permissions: [],
      setUser: (user) => set({ user }),
      setPermissions: (permissions) => set({ permissions }),
      clearUser: () => set({ user: null, permissions: [] }),
      hasPermission: (permissionName: string) => {
        const { permissions, user } = get();
        // Admin users have all permissions
        if (user?.roles?.some((role) => role.name === "admin")) {
          return true;
        }
        return permissions.some((p) => p.name === permissionName);
      },
      isAdmin: () => {
        const { user } = get();
        return user?.roles?.some((role) => role.name === "admin") || false;
      },
    }),
    {
      name: "user-storage", // key in sessionStorage
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
