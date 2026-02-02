import { USER_KEY } from "@/constants/SecureStoreKeys";
import { useAppStore } from "@/store";
import { User } from "@/types/User";
import { getFromSecureStore } from "@/utils/secure-store";
import { useEffect, useState } from "react";

export function useAuthSession() {
  const login = useAppStore(state => state.login);
  const setUserDetails = useAppStore(state => state.setUserDetails);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      const storedUser = await getFromSecureStore<User>(USER_KEY);

      if (isMounted && storedUser) {
        setUser(storedUser);
      }
    };

    void loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    login(user.uid, user.email);
    setUserDetails(user.details);
  }, [user, login, setUserDetails]);
}
