import { User, UserDetails } from "@/types/User";
import { StateCreator } from "zustand";
import { AppState } from ".";

export type AuthSlice = {
  user: User | null;
  isLoggedIn: boolean;
  login: (userId: string, email: string) => void;
  logout: () => void;
  setUserDetails: (userDetails: UserDetails | null) => void;
};

export const createAuthSlice: StateCreator<AppState, [], [], AuthSlice> = set => ({
  user: null,
  isLoggedIn: false,

  login: (userId: string, email: string) =>
    set(state => ({
      user: state.user
        ? {
            ...state.user,
            uid: userId,
            email,
          }
        : {
            uid: userId,
            email,
            details: {
              firstName: null,
              lastName: null,
              dateOfBirth: null,
              height: null,
              weight: null,
            },
          },
      isLoggedIn: true,
    })),

  logout: () =>
    set({
      user: null,
      isLoggedIn: false,
    }),

  setUserDetails: (userDetails: UserDetails | null) =>
    set(state => {
      if (!state.user) return { user: null };

      return {
        user: {
          ...state.user,
          details: userDetails
            ? { ...state.user.details, ...userDetails }
            : {
                firstName: null,
                lastName: null,
                dateOfBirth: null,
                height: null,
                weight: null,
              },
        },
      };
    }),
});
