/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface LoginContextProps {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  handleLogout: () => void;
  setCartQuantity: Dispatch<SetStateAction<any>>;
  cartQuantity: number;
}

export const LoginContext = createContext<LoginContextProps>({
  user: null,
  setUser: () => {},
  handleLogout: () => {},
  setCartQuantity: () => {},
  cartQuantity: 0,
});

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const contextValue: LoginContextProps = {
    user,
    setUser,
    handleLogout,
    setCartQuantity,
    cartQuantity,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};
