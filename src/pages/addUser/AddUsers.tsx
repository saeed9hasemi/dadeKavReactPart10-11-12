import { useForm } from "react-hook-form";
import Container from "../../components/container/Container";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser, greenNotif, redNotif } from "../../services/api";
import Button from "../../components/button/Button";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/AuthContext";
import type { IUser } from "../../types/type";
import { SHA256 } from "crypto-js";

function AddUsers() {
  const { openModal } = useAuth();

  const schema = z.object({
    name: z.string().min(2, "at least 2 characters"),
    lastName: z.string().min(2, "at least 2 characters"),
    email: z.string().email(),
    nationalCode: z
      .string()
      .length(10, "National code must be 10 digits")
      .regex(/^\d+$/, "Only digits are allowed"),
    password: z.string().min(8, "at least 8 characters"),
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

  const add = (param: IUser) => {
    addUser(param)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          greenNotif("User added successfuly.");
          reset();
        } else {
          redNotif("User update failed");
        }
      })
      .catch(() => {
        redNotif("Something went wrong");
      });
  };

  const onSubmit = (data: TSchema) => {
    const payload = {
      ...data,
      password: SHA256(data.password).toString(),
      id: uuidv4(),
      profile:
        "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/11.jpg",
      admin: false,
    };
    console.log(payload);
    openModal({
      content: "Are you sure about your information?",
      job: add,
      param: payload,
      trueButt: "Add",
      falseButt: "Edit",
      trueVariant: "success",
      falseVariant: "danger",
    });
  };

  return (
    <Container>
      <form
        className="mt-10 rounded-lg bg-white/5 p-6 flex flex-col  gap-4 mx-auto w-full sm:w-10/12 md:w-8/12 lg:w-6/12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-5 text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Add User:
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
          <p className="text-sm text-rose-600">{errors.nationalCode.message}</p>
        )}
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="success"
          className="w-full"
        >
          {isSubmitting ? "loading ... " : "Add User"}
        </Button>
      </form>
    </Container>
  );
}

export default AddUsers;
