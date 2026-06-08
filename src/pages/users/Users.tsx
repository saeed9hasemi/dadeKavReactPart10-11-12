import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";
import type { IUser, TStatus } from "../../types/type";
import { fetchUsers, redNotif } from "../../services/api";
import { ClockLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Users() {
  const { isLogin } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);
  const [status, setStatus] = useState<TStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus("loading");
    fetchUsers()
      .then((res) => {
        setUsers(res);
        setStatus("succeeded");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("failed");
      });
  }, []);

  if (status === "failed") {
    redNotif(error);
    return (
      <Container>
        <h2 className="mt-10 text-2xl font-semibold text-white">Users:</h2>
        <div className="w-full mt-10 text-lg text-center text-rose-600 ">
          {error}
        </div>
      </Container>
    );
  }

  if (status === "idle" || status === "loading") {
    return (
      <Container>
        <h2 className="mt-10 text-2xl font-semibold text-white">Users:</h2>
        <div className="w-full flex justify-center items-center gap-4 mt-10 flex-col">
          <ClockLoader size={64} color="white" />
          <p>loading ...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-10 flex justify-between items-center">
        <h2 className=" text-2xl font-semibold text-white">Users:</h2>
        {isLogin && (
          <Link to={"/users/addUser"}>
            <Button variant="success">Add User</Button>
          </Link>
        )}
      </div>
      <div className="w-full p-8 bg-white/5 rounded-lg mt-8">
        <div className="flex flex-col  [&>div:nth-of-type(odd)]:bg-white/5">
          <div className="row flex items-center    rounded-lg gap-1 py-3 px-2  text-[wheat]">
            <span className="w-1/12 text-center overflow-hidden truncate text-sm md:text-base">
              No.
            </span>
            <span className="w-3/12 sm:w-2/12 text-center overflow-hidden truncate text-sm md:text-base">
              name
            </span>
            <span className="w-3/12 sm:w-2/12 text-center overflow-hidden truncate text-sm md:text-base">
              last name
            </span>
            <span className="hidden sm:block w-4/12 text-center overflow-hidden truncate">
              email
            </span>
            <span className="w-3/12 sm:w-2/12 text-center overflow-hidden truncate text-sm md:text-base">
              national code
            </span>
            <span className="w-2/12 sm:w-1/12 text-center overflow-hidden truncate text-sm md:text-base">
              edit
            </span>
          </div>
          {/* //////////////////////////////users */}
          {users?.map((item, index) => {
            return (
              <div className="row flex items-center gap-1  rounded-lg py-3 px-2 ">
                <span className="w-1/12 text-center truncate overflow-hidden  sm:text-lg md:text-xl font-bold text-[wheat]">
                  {index + 1}
                </span>
                <span className="w-3/12 sm:w-2/12 text-center truncate overflow-hidden text-sm md:text-base">
                  {item.name}
                </span>
                <span className="w-3/12 sm:w-2/12 text-center truncate overflow-hidden text-sm md:text-base">
                  {item.lastName}
                </span>
                <span className="hidden sm:block w-4/12 text-center truncate overflow-hidden text-sm md:text-base">
                  {item.email}
                </span>
                <span className="w-3/12 sm:w-2/12 text-center truncate overflow-hidden text-sm md:text-base">
                  {/* {item.nationalCode} */}
                  {item.nationalCode}
                </span>
                <span className="w-2/12 sm:w-1/12 text-center">
                  {isLogin ? (
                    <Link to={`edit/${item.id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => {
                        redNotif("You shold login as Admin to edit a user!");
                      }}
                    >
                      Edit
                    </Button>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default Users;
