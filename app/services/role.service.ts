import { CreateRoleDto, UpdateRoleDto } from "../Dto/role/role.dto";
import { fetchData } from "./api.service";

export const getRoles = async (
  page: number,
  limit: number,
  keyword?: string
) => {
  try {
    const data = await fetchData({
      method: "GET",
      endpoint: "/roles",
      params: { page, limit, keyword },
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createRoles = async (payload: CreateRoleDto) => {
  try {
    const data = await fetchData({
      method: "POST",
      endpoint: "/roles",
      data: { ...payload },
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateRoles = async (id: string, payload: UpdateRoleDto) => {
  try {
    const data = await fetchData({
      method: "PATCH",
      endpoint: `/roles/${id}/update`,
      data: { ...payload },
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export const deleteRoles = async (id: string) => {
  try {
    const data = await fetchData({
      method: "PATCH",
      endpoint: `/roles/${id}/deactivate`,
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};