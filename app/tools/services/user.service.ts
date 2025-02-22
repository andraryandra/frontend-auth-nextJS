import { fetchData } from "./api.service";

export const getUsers = async (page: number, limit: number) => {
  try {
    const data = await fetchData({
      method: "GET",
      endpoint: "/users",
      params: { page, limit },
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
