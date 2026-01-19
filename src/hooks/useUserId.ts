import { useAppStore } from "@/store";

export const useUserId = () => useAppStore(store => store.user!.uid);
