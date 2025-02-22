
import { BaseDto } from "../Dto/Base/base.dto";
import { CreateCategoriesDto, UpdateCategoriesDto } from "../Dto/categories/categories.dto";
import { fetchData } from "./api.service";

export const getCategories = async (
  params: BaseDto
) => {
  try {
    const data = await fetchData({
      method: "GET",
      endpoint: "/categories",
      params: { ...params },
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createCategories = async (payload: CreateCategoriesDto) => {
  try {
    const data = await fetchData({
      method: "POST",
      endpoint: "/categories",
      data: { ...payload },
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getCategoryById = async (id: number) => {
    try {
        const data = await fetchData({
        method: "GET",
        endpoint: `/categories/${id}`   ,
        });
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const updateCategories = async (id: number, payload: UpdateCategoriesDto) => {
  try {
    const data = await fetchData({
      method: "PATCH",
      endpoint: `/categories/${id}`,
      data: { ...payload },
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export const deleteCategories = async (id: number) => {
  try {
    const data = await fetchData({
      method: "DELETE",
      endpoint: `/categories/${id}`,
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};