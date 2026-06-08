import { createContext, useContext, useState } from "react";
import type { IModal } from "../types/type";

interface IAuthContext {
  children: React.ReactNode;
}

interface IauthContext {
  modal: IModal | null;
  openModal: (modal: IModal) => void;
  closeModal: () => void;
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

const authContext = createContext<IauthContext>({} as IauthContext);

function AuthContext({ children }: IAuthContext) {
  ///////////////////////////////modal
  const [modal, setModal] = useState<IModal | null>(null);
  const openModal = (modal: IModal) => {
    setModal(modal);
  };
  const closeModal = () => {
    setModal(null);
  };
  ////////////////////////////////

  const [isLogin, setIsLogin] = useState<boolean>(() => {
    const localLogin = localStorage.getItem("login");
    if (localLogin) {
      return JSON.parse(localLogin);
    } else {
      return false;
    }
  });

  const logout = () => {
    setIsLogin(false);
    localStorage.setItem("login", JSON.stringify(false));
  };

  const login = () => {
    setIsLogin(true);
    localStorage.setItem("login", JSON.stringify(true));
  };

  return (
    <authContext.Provider
      value={{ modal, openModal, closeModal, login, logout, isLogin }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthContext;

export const useAuth = () => useContext(authContext);
