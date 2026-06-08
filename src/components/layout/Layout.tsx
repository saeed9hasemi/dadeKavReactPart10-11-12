import { Routes } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ToastContainer } from "react-toastify";
import AlertModal from "../alertModal/AlertModal";
import AuthContext from "../../contexts/AuthContext";

interface ILayout {
  children: React.ReactNode;
}

function Layout({ children }: ILayout) {
  return (
    <div className="bg-slate-800 text-slate-300 min-h-screen flex flex-col">
      <AuthContext>
        <Header />
        <main className="grow">
          <Routes>{children}</Routes>
        </main>
        <Footer />
        <AlertModal />
        <ToastContainer />
      </AuthContext>
    </div>
  );
}

export default Layout;
