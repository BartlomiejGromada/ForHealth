import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./authSlice";
import { immer } from "zustand/middleware/immer";
import { createVisitSlice, VisitsSlice } from "./visitsSlice";

export type AppState = AuthSlice & VisitsSlice;

export const useAppStore = create<AppState>()(
  immer((...args) => ({
    ...createAuthSlice(...args),
    ...createVisitSlice(...args),
  }))
);
