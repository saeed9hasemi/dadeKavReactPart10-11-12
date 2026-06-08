import { Link } from "react-router-dom";
import Container from "../container/Container";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { isLogin, openModal, logout } = useAuth();
  return (
    <div className="sticky top-0 backdrop-blur-2xl w-full bg-slate-900/60">
      <Container>
        <div className="flex justify-between items-center p-3">
          <Link to={"/"} className="left logo cursor-pointer ">
            <div className="font-semibold text-2xl text-white">
              <span className="text-rose-800 font-bold">DadeKav</span>Web
            </div>
            <div className="text-[11px] text-slate-500 -mt-0.5">
              makes the Web a better place
            </div>
          </Link>
          <nav className="middle flex items-center gap-4">
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
          <div className="right">
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
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
