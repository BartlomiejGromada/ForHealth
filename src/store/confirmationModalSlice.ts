import { GestureResponderEvent } from "react-native";
import { StateCreator } from "zustand";
import { AppState } from ".";

export type ConfirmationModalConfig = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void>;
};

export type ConfirmatioModalSlice = {
  isOpenConfirmationModal: boolean;
  isLoadingConfirmationModal: boolean;
  configConfirmationModal: ConfirmationModalConfig | null;
  openConfirmationModal: (config: ConfirmationModalConfig) => void;
  closeConfirmationModal: (e: GestureResponderEvent) => void;
  setIsLoadingConfirmationModal: (isLoading: boolean) => void;
};

export const createConfirmationModalSlice: StateCreator<
  AppState,
  [],
  [],
  ConfirmatioModalSlice
> = set => ({
  isOpenConfirmationModal: false,
  isLoadingConfirmationModal: false,
  configConfirmationModal: null,
  openConfirmationModal: config =>
    set({
      isOpenConfirmationModal: true,
      configConfirmationModal: config,
      isLoadingConfirmationModal: false,
    }),
  closeConfirmationModal: () =>
    set({
      isOpenConfirmationModal: false,
      configConfirmationModal: null,
      isLoadingConfirmationModal: false,
    }),
  setIsLoadingConfirmationModal: loading => set({ isLoadingConfirmationModal: loading }),
});
