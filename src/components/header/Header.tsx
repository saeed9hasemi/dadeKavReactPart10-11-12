import { Link } from "react-router-dom";
import Container from "../container/Container";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Header() {
  const { isLogin, openModal, logout } = useAuth();
  const [isActive, setIsAvctive] = useState(false);
  return (
    <div className="sticky top-0 w-full z-50">
      <div className="w-full bg-slate-900/70 backdrop-blur-2xl">
        <Container>
          <div className="relative flex justify-between items-center p-3">
            <Link to={"/"} className="left logo cursor-pointer ">
              <div className="font-semibold text-2xl text-white">
                <span className="text-rose-800 font-bold">DadeKav</span>Web
              </div>
              <div className="text-[11px] text-slate-500 -mt-0.5">
                makes the Web a better place
              </div>
            </Link>
            <nav className="middle hidden sm:flex items-center gap-4">
              <Link to={"/"} className="hover:text-white">
                Home
              </Link>
              <Link to={"/products"} className="hover:text-white">
                Products
              </Link>
              <Link to={"/users"} className="hover:text-white">
                Users
              </Link>
            </nav>
            <div className="right flex items-center gap-6">
              {isLogin ? (
                <div
                  className="rounded-lg py-1 px-3 bg-rose-800/90 border border-rose-800/90 hover:bg-rose-800 text-white cursor-pointer"
                  onClick={() => {
                    openModal({
                      content: "Are sure about logging out?",
                      job: logout,
                      trueButt: "Logout",
                      falseButt: "Back",
                      trueVariant: "danger",
                      falseVariant: "primary",
                    });
                  }}
                >
                  Logout
                </div>
              ) : (
                <Link
                  to={"/login"}
                  className="rounded-lg py-1 px-3 bg-rose-800/90 border border-rose-800/90 hover:bg-rose-800 text-white"
                >
                  Login
                </Link>
              )}
              <div
                className="sm:hidden text-2xl cursor-pointer hover:text-white"
                onClick={() => {
                  setIsAvctive((current) => {
                    return !current;
                  });
                }}
              >
                {isActive ? <AiOutlineCloseCircle /> : <HiOutlineMenu />}
              </div>
            </div>
          </div>
        </Container>
      </div>
      {isActive && (
        <div className="menu sm:hidden w-full flex flex-col bg-slate-900/50 backdrop-blur-2xl z-50 border-t border-t-slate-700">
          <Link
            to={"/"}
            className="hover:text-white hover:bg-white/5 p-3 w-full text-center"
            onClick={() => {
              setIsAvctive(false);
            }}
          >
            Home
          </Link>
          <Link
            to={"/products"}
            className="hover:text-white hover:bg-white/5 p-3 w-full text-center"
            onClick={() => {
              setIsAvctive(false);
            }}
          >
            Products
          </Link>
          <Link
            to={"/users"}
            className="hover:text-white hover:bg-white/5 p-3 w-full text-center "
            onClick={() => {
              setIsAvctive(false);
            }}
          >
            Users
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
