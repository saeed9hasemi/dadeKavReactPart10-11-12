import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import { useEffect, useState } from "react";
import type { IUser, TStatus } from "../../types/type";
import {
  deleteUser,
  editUser,
  fetchUserById,
  greenNotif,
  redNotif,
} from "../../services/api";
import { ClockLoader } from "react-spinners";
import Button from "../../components/button/Button";
import z, { email } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../../contexts/AuthContext";

function EditUsers() {
  const { openModal } = useAuth();
  const { id } = useParams();
  const [user, setUser] = useState<IUser>({} as IUser);
  const [status, setStatus] = useState<TStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /////////////////////////////////////////////////form
  const schema = z.object({
    name: z.string().min(2, "at least 2 characters"),
    lastName: z.string().min(2, "at least 2 characters"),
    email: z.string().email(),
    nationalCode: z
      .string()
      .length(10, "National code must be 10 digits")
      .regex(/^\d+$/, "Only digits are allowed"),
    password: z
      .union([z.literal(""), z.string().min(8, "at least 8 characters")])
      .optional(),
    admin: z.boolean(),
    profile: z.string().url(),
    id: z.string(),
  });

  type TSchema = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: TSchema) => {
    const payload = { ...data };
    if (data.password === "") {
      delete payload.password;
    }
    console.log("ediiiiiiiiiiiit");
    try {
      const res = await editUser(data.id, payload);
      if (res.status === 200) {
        greenNotif("User updated successfuly.");
      } else {
        redNotif("User update failed");
      }
    } catch (err) {
      redNotif("Something went wrong");
    }
  };

  const onDelete = (param: string) => {
    try {
      deleteUser(id).then((res) => {
        if (res.status === 200) {
          greenNotif("User deleted successfuly.");
          navigate("/users");
        } else {
          redNotif("failed to delete");
        }
      });
    } catch (err) {
      redNotif("Something went wrong");
    }
  };

  useEffect(() => {
    setStatus("loading");
    fetchUserById(id)
      .then((res) => {
        setUser(res);
        setStatus("succeeded");
        const { password, ...rest } = res;
        reset({ ...rest, password: "" });
      })
      .catch((err) => {
        setError(err.message);
        setStatus("failed");
      });
  }, [reset, user.id]);

  if (status === "failed") {
    redNotif(error);
    return (
      <Container>
        <h2 className="mt-10 text-2xl font-semibold text-white">Edit user:</h2>
        <div className="w-full mt-10 text-lg text-center text-rose-600 ">
          {error}
        </div>
      </Container>
    );
  }

  if (status === "idle" || status === "loading") {
    return (
      <Container>
        <h2 className="mt-10 text-2xl font-semibold text-white">Edit user:</h2>
        <div className="w-full flex justify-center items-center gap-4 mt-10 flex-col">
          <ClockLoader size={64} color="white" />
          <p>loading ...</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <form
          className="mt-10 rounded-lg bg-white/5 p-6 flex flex-col  gap-4 mx-auto w-full sm:w-10/12 md:w-8/12 lg:w-6/12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="mb-5 text-lg sm:text-xl md:text-2xl font-semibold text-white">
            Edit user:
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
              htmlFor="lastName"
            >
              last name:
            </label>
            <input
              type="text"
              id="lastName"
              className="px-3 py-0.5 rounded-lg bg-white/10 outline-none text-sm sm:text-base w-full "
              {...register("lastName")}
            />
          </div>
          {errors.lastName && (
            <p className="text-sm text-rose-600">{errors.lastName.message}</p>
          )}
          <div className="flex items-center gap-4">
            <label
              className="text-sm sm:text-base font-semibold w-4/12"
              htmlFor="email"
            >
              email:
            </label>
            <input
              type="text"
              id="email"
              className="px-3 py-0.5 rounded-lg bg-white/10 outline-none text-sm sm:text-base w-full "
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-rose-600">{errors.email.message}</p>
          )}
          <div className="flex items-center gap-4">
            <label
              className="text-sm sm:text-base font-semibold w-4/12"
              htmlFor="password"
            >
              password:
            </label>
            <input
              type="password"
              id="password"
              className="px-3 py-0.5 rounded-lg bg-white/10 outline-none text-sm sm:text-base w-full"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-rose-600">{errors.password.message}</p>
          )}
          <div className="flex items-center gap-4">
            <label
              className="text-sm sm:text-base font-semibold w-4/12"
              htmlFor="code"
            >
              national code:
            </label>{" "}
            <input
              type="text"
              id="code"
              className="px-3 py-0.5 rounded-lg bg-white/10 outline-none text-sm sm:text-base w-full"
              {...register("nationalCode")}
            />
          </div>
          {errors.nationalCode && (
            <p className="text-sm text-rose-600">
              {errors.nationalCode.message}
            </p>
          )}
          <Button variant="success" className="w-full" type="submit">
            {isSubmitting ? "loading ..." : "Submit"}
          </Button>
          <Button
            variant="danger"
            className="w-full"
            type="button"
            onClick={() => {
              openModal({
                content: "Are you sure you want to delete the user?",
                job: onDelete,
                param: user.id,
                trueButt: "Delete",
                falseButt: "Keep",
                trueVariant: "danger",
                falseVariant: "success",
              });
            }}
          >
            {isSubmitting ? "loading ..." : "Delete"}
          </Button>
        </form>
      </Container>
    </>
  );
}

export default EditUsers;
