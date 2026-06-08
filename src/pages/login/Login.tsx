import { useForm } from "react-hook-form";
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { greenNotif, redNotif, searchUser } from "../../services/api";
import CryptoJS from "crypto-js";
import type { IUser } from "../../types/type";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const { login } = useAuth();

  const schema = z.object({
    name: z.string().min(2, "at least 2 characters"),
    password: z.string().min(8, "at least 8 characters"),
  });

  type TSchema = z.infer<typeof schema>;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSchema>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: TSchema) => {
    const { name, password } = data;
    const hashedPass = CryptoJS.SHA256(password).toString();
    console.log(hashedPass);

    try {
      await searchUser(name)
        .then((res) => {
          console.log(res);
          if (res.status === 200 || res.status === 201) {
            const users = res.data;
            if (users.length > 0) {
              const found = users.find((item: IUser) => {
                return (
                  item.password == hashedPass &&
                  item.name.toLowerCase() == name.toLowerCase()
                );
              });
              if (found) {
                if (found.admin) {
                  greenNotif("you are successfully signed in as Admin");
                  login();
                  reset();
                } else {
                  greenNotif("you are successfully signed in as normal user");
                  reset();
                }
              } else {
                redNotif("wrong password!");
              }
            } else {
              redNotif("username not found!");
            }
          } else {
            redNotif("someting went wrong");
          }
        })
        .catch((err) => {
          redNotif(err.message);
        });
    } catch (error) {
      redNotif("username not found!");
    }
  };

  return (
    <Container>
      <form
        className="mt-10 rounded-lg bg-white/5 p-6 flex flex-col  gap-4 mx-auto w-full sm:w-10/12 md:w-8/12 lg:w-6/12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-5 text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Login:
        </h2>
        <div className="flex items-center gap-4">
          <label
            className="text-sm sm:text-base font-semibold w-4/12"
            htmlFor="name"
          >
            name:
          </label>
          <input
            type="text"
            id="name"
            className="px-3 py-0.5 rounded-lg bg-white/10 outline-none text-sm sm:text-base w-full"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="text-sm text-rose-600">{errors.name.message}</p>
        )}
        <div className="flex items-center gap-4">
          <label
            className="text-sm sm:text-base font-semibold w-4/12"
            htmlFor="password"
          >
            password:
          </label>
          <input
            type="text"
            id="password"
            className="px-3 py-0.5 rounded-lg bg-white/10 outline-none text-sm sm:text-base w-full "
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-rose-600">{errors.password.message}</p>
        )}
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="primary"
          className="w-full"
        >
          {isSubmitting ? "loading ... " : "Login"}
        </Button>
      </form>
    </Container>
  );
}

export default Login;
