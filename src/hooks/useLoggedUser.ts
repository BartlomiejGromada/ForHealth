import { useAppStore } from "@/store";

export const useLoggedUser = () => useAppStore(store => store.user);
