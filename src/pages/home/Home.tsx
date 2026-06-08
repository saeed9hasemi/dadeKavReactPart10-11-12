import { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import type { IUser, TStatus } from "../../types/type";
import { fetch10Users, redNotif } from "../../services/api";
import { Link } from "react-router-dom";
import { ClockLoader } from "react-spinners";

function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [status, setStatus] = useState<TStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus("loading");
    fetch10Users()
      .then((res) => {
        setUsers(res);
        setStatus("succeeded");
      })
      .catch((err) => {
        setStatus("failed");
        setError(err.message);
      });
  }, []);

  if (status === "failed") {
    redNotif(error);
    return (
      <Container>
        <h2 className="mt-10  text-xl  md:text-2xl font-semibold text-white">
          People you may know:
        </h2>
        <div className="w-full mt-10 text-lg text-center text-rose-600 ">
          {error}
        </div>
      </Container>
    );
  }

  if (status === "idle" || status === "loading") {
    return (
      <Container>
        <h2 className="mt-10  text-xl  md:text-2xl font-semibold text-white">
          People you may know:
        </h2>
        <div className="w-full flex justify-center items-center gap-4 mt-20 flex-col">
          <ClockLoader size={50} color="white" />
          <p>loading ...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-10 rounded-lg bg-white/5 p-6 w-full">
        <h2 className=" text-xl  md:text-2xl font-semibold text-white">
          People you may know:
        </h2>
        <div className="list mt-5 flex flex-col [&>div:nth-of-type(odd)]:bg-white/5">
          {users?.map((item) => {
            return (
              <div className="row flex flex-col sm:flex-row  sm:items-center gap-2 sm:gap-5 rounded-lg py-3 px-4 ">
                <div className="flex items-center justify-between gap-4 w-full sm:w-1/2 ">
                  <div className="imgWrapper size-15 sm:size-10 rounded-full bg-slate-500 overflow-hidden">
                    <img
                      src={item.profile}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="name overflow-hidden truncate text-white font-semibold  w-1/3 sm:w-1/4">
                    {item.name}
                  </div>
                  <div className="lastnName overflow-hidden truncate flex-1">
                    {item.lastName}
                  </div>
                </div>
                <div className="email flex-1 overflow-hidden truncate hidden sm:block ">
                  {item.email}
                </div>
              </div>
            );
          })}
        </div>
        <Link to={"/users"}>
          <div className="mt-5 font-semibold text-center cursor-pointer text-lg text-white bg-rose-900 sm:bg-rose-900/70 hover:bg-rose-900 p-2 rounded-lg">
            See All
          </div>
        </Link>
      </div>
    </Container>
  );
}

export default Home;
