export type TStatus = "idle" | "loading" | "succeeded" | "failed";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface IUser {
  name: string;
  lastName: string;
  email: string;
  nationalCode: string;
  password?: string | undefined;
  admin: boolean;
  profile: string;
  id: string;
}

export interface IModal {
  content: string;
  job: (param?: any) => void;
  param?: string | IUser;
  trueButt: string;
  falseButt: string;
  trueVariant: "success" | "danger" | "primary";
  falseVariant: "success" | "danger" | "primary";
}

export interface ILoginUser {
  name: string;
  password: string;
}
