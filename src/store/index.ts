import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { AuthSlice, createAuthSlice } from "./authSlice";
import { ConfirmatioModalSlice, createConfirmationModalSlice } from "./confirmationModalSlice";
import { createInformationModalSlice, InforamtionModalSlice } from "./informationModalSlice";
import { createVisitSlice, VisitsSlice } from "./visitsSlice";

export type AppState = AuthSlice & VisitsSlice & ConfirmatioModalSlice & InforamtionModalSlice;

export const useAppStore = create<AppState>()(
  immer((...args) => ({
    ...createAuthSlice(...args),
    ...createVisitSlice(...args),
    ...createConfirmationModalSlice(...args),
    ...createInformationModalSlice(...args),
  }))
);
