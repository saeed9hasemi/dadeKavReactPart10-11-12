import axios from "axios";
import { toast } from "react-toastify";
import type { IUser } from "../types/type";

export const redNotif = (error: string | null) => {
  toast.error(error, {
    position: "bottom-center",
    theme: "dark",
    style: {
      backgroundColor: "rgba(255,255,255,0.1)",
      fontSize: "14px",
      backdropFilter: "blur(5px)",
    },
    hideProgressBar: true,
  });
};

export const greenNotif = (text: string | null) => {
  toast.success(text, {
    position: "bottom-center",
    theme: "dark",
    style: {
      backgroundColor: "rgba(255,255,255,0.1)",
      fontSize: "14px",
      backdropFilter: "blur(5px)",
    },
    hideProgressBar: true,
  });
};

export const fetchProducts = async () => {
  const res = await axios.get("https://fakestoreapi.com/products");
  return res.data;
};

export const fetchUsers = async () => {
  const res = await axios.get(
    "https://6a26d207a84f9d39e907efda.mockapi.io/dadeKav/users",
  );
  return res.data;
};

export const fetch10Users = async () => {
  const res = await axios.get(
    "https://6a26d207a84f9d39e907efda.mockapi.io/dadeKav/users?p=1&limit=10",
  );
  return res.data;
};

export const fetchUserById = async (id: string | undefined) => {
  const res = await axios.get(
    `https://6a26d207a84f9d39e907efda.mockapi.io/dadeKav/users/${id}`,
  );
  return res.data;
};

export const editUser = async (id: string | undefined, user: IUser) => {
  const res = await axios.put(
    `https://6a26d207a84f9d39e907efda.mockapi.io/dadeKav/users/${id}`,
    user,
  );
  return res;
};

export const deleteUser = async (id: string | undefined) => {
  const res = await axios.delete(
    `https://6a26d207a84f9d39e907efda.mockapi.io/dadeKav/users/${id}`,
  );
  return res;
};

export const addUser = async (user: IUser) => {
  const res = await axios.post(
    `https://6a26d207a84f9d39e907efda.mockapi.io/dadeKav/users`,
    user,
  );
  return res;
};

export const searchUser = async (name: string) => {
  const res = await axios.get(
    `https://6a26d207a84f9d39e907efda.mockapi.io/dadeKav/users?search=${name}`,
  );
  return res;
};
