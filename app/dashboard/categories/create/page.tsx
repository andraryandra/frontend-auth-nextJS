"use client";

import React, { useState } from "react";
import DashboardLayout from "../../../components/DashboardLayout";
import { CreateCategoriesDto } from "@/app/tools/Dto/categories/categories.dto";
import { createCategories } from "@/app/tools/services/categories.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CategoriesCreatePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateCategoriesDto>({
    name: "",
    description: "",
    status: true,
  });

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

  const handleCreate = async (data: CreateCategoriesDto) => {
    try {
      const result = await createCategories(data);
      toast.success("Category created successfully");

      // Redirect to categories page
      router.replace("/dashboard/categories");
      return result;
    } catch (error) {
      toast.error("Error creating category");
      console.error("Error creating category:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreate(formData);
  };

  const handleBack = () => {
    router.push("/dashboard/categories");
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold mb-6">Categories Create Page</h1>
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
            Create Category
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CategoriesCreatePage;