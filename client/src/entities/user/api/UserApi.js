import axiosInstance from "../../../shared/lib/axiosInstance";
import React from "react";


const API_AUTH_URL = "/api/auth";
const VITE_API = import.meta.env.VITE_API || "http://localhost:3000/api";

export default class UserApi {
  static async signup(userData) {
    const { data } = await axiosInstance.post(
      API_AUTH_URL + "/signup",
      userData
    );
    return data;
  }

  static async login(userData) {
    const { data } = await axiosInstance.post(
      API_AUTH_URL + "/login",
      userData
    );
    return data;
  }

  static async logout() {
    const { data } = await axiosInstance(API_AUTH_URL + "/logout");
    return data;
  }
   static async getAll() {
    const { data } = await axiosInstance.get(VITE_API + "/user");
    return data;
  }

  static async getOne(id) {
  const { data } = await axiosInstance.get(VITE_API + `/user/${id}`);
  return data;
}

}
