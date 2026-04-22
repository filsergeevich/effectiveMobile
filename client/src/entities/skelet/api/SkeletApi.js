import axiosInstance from "../../../shared/lib/axiosInstance";
import React from "react";


const API_AUTH_URL = "/api/auth";
const VITE_API = import.meta.env.VITE_API || "http://localhost:3000/api";

export class SkeletApi {
  static async getAll() {
    const { data } = await axiosInstance.get(VITE_API + "/skelets");
    return data;
  }
  static async create(skeletData) {
    const { data } = await axiosInstance.post(VITE_API + "/skelets", skeletData);
    return data;
  }
  static async update(skeletId, skeletData) {
    const { data } = await axiosInstance.put(
      VITE_API + `/skelets/${skeletId}`,
      skeletData
    );
    return data;
  }
  static async delete(skeletId) {
    const { data } = await axiosInstance.delete(
      VITE_API + `/skelets/${skeletId}`
    );
    return data;
  }
}