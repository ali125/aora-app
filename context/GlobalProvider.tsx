import { getCurrentUser } from "@/lib/appwrite";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const initialContext = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isLoading: true,
  user: null,
  setUser: () => {},
};

type ContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  isLoading: boolean;
  user: any;
  setUser: (user: any) => void;
};

const GlobalContext = createContext<ContextType>(initialContext);

export const useGlobalContext = () => useContext(GlobalContext);

type Props = PropsWithChildren;

const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await getCurrentUser();
        setUser(response || null);
        setIsLoggedIn(!!response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isLoading, user, setUser }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
