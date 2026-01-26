import { StateCreator } from "zustand";
import { AppState } from ".";

export type InforamtionModalConfig = {
  title?: string;
  message?: string;
};

export type InforamtionModalSlice = {
  isOpenInformationModal: boolean;
  configInformationModal: InforamtionModalConfig | null;
  openInformationModal: (config: InforamtionModalConfig) => void;
  closeInformationModal: Function;
};

export const createInformationModalSlice: StateCreator<
  AppState,
  [],
  [],
  InforamtionModalSlice
> = set => ({
  isOpenInformationModal: false,
  configInformationModal: null,
  openInformationModal: config => {
    set({
      isOpenInformationModal: true,
      configInformationModal: config,
    });
  },
  closeInformationModal: () =>
    set({
      isOpenInformationModal: false,
      configInformationModal: null,
    }),
});
