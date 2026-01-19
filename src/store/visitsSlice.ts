import { Visit, VisitStatus } from "@/types/Visit";
import { StateCreator } from "zustand";
import { AppState } from ".";

export type VisitsSlice = {
  visits: Visit[];
  detailsOfVisit?: Visit | null;
  setDetaislOfVisit: (visit: Visit | null) => void;
  changeVisitStatus: (newStatus: VisitStatus) => void;
  removeVisit: (visitId: string) => void;
};

export const createVisitSlice: StateCreator<AppState, [], [], VisitsSlice> = set => ({
  visits: [],
  detailsVisit: undefined,
  changeVisitStatus: newStatus =>
    set(state => {
      if (!state.detailsOfVisit) {
        return { detailsOfVisit: null };
      }

      return {
        detailsOfVisit: {
          ...state.detailsOfVisit,
          status: newStatus,
        },
      };
    }),
  setDetaislOfVisit: (visit: Visit | null) =>
    set({
      detailsOfVisit: visit,
    }),
  removeVisit: visitId =>
    set(state => ({
      visits: state.visits.filter(visit => visit.id !== visitId),
      detailsVisit: state.detailsOfVisit?.id === visitId ? undefined : state.detailsOfVisit,
    })),
});
