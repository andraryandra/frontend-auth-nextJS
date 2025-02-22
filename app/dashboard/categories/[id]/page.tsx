"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { CreateCategoriesDto } from "@/app/tools/Dto/categories/categories.dto";
import { getCategoryById, updateCategories } from "@/app/tools/services/categories.service";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

const CategoriesUpdatePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState<CreateCategoriesDto>({
    name: "",
    description: "",
    status: true,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryId = Number(id);
        const response = await getCategoryById(categoryId);
        const category = response.data;
        setFormData({
          name: category.name,
          description: category.description,
          status: category.status,
        });
      } catch (error) {
        toast.error("Error fetching category data");
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (data: CreateCategoriesDto) => {
    try {
      const categoryId = Number(id);
      const result = await updateCategories(categoryId, data);
      toast.success("Category updated successfully");

      // Redirect to categories page
      router.replace("/dashboard/categories");
      return result;
    } catch (error) {
      toast.error("Error updating category");
      console.error("Error updating category:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  const handleBack = () => {
    router.push("/dashboard/categories");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold mb-6">Categories Update Page</h1>
      <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <button
          onClick={handleBack}
          className="mb-4 bg-gray-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Back
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Category
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CategoriesUpdatePage;