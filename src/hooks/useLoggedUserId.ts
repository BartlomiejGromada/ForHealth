import { useAppStore } from "@/store";

export const useLoggedUserId = () => useAppStore(store => store.user!.uid);
