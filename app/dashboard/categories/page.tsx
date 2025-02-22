"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import TableSearch from "@/app/components/TableSearch";
import { CategoriesDto } from "@/app/tools/Dto/categories/categories.dto";
import { BaseDto } from "@/app/tools/Dto/Base/base.dto";
import {
  deleteCategories,
  getCategories,
} from "@/app/tools/services/categories.service";
import TableCategories from "./TableCategories";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const CategoriesPage = () => {
  const router = useRouter();

  // Table Data
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState<CategoriesDto[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  /* ---------------------- Start Get Data Table Categories ---------------------- */
  const fetchDataPage = async () => {
    try {
      const params: BaseDto = {
        page: currentPage,
        limit: itemsPerPage,
        keyword: searchTerm,
      };
      const response = await getCategories(params);
      if (response && Array.isArray(response.data)) {
        setTableData(response.data);
        setTotalItems(response.metadata.total);
        setTotalPages(response.metadata.totalPages);
      } else {
        console.error("Expected an array but got:", response);
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };

  useEffect(() => {
    fetchDataPage();
  }, [currentPage, searchTerm, itemsPerPage]);
  /* ----------------------- End Get Data Table Categories ----------------------- */

  /* ------------------------- Start Update Categories ------------------------ */

  const handleEdit = (id: number) => {
    router.push(`/dashboard/categories/${id}`);
  };

  /* -------------------------- End Update Categories ------------------------- */

  /* ------------------------- Start Delete Categories ------------------------ */

  const handleDelete = async (id: number) => {
    try {
      await deleteCategories(id);
      fetchDataPage();
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  /* -------------------------- End Delete Categories ------------------------- */

  /* -------------------------- Start Feature Table Default ------------------------- */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Reset Search
  const handleResetSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };
  /* ------------------------ End Feature Table Default ----------------------- */

  return (
    <DashboardLayout>
      <h1 className="text-3xl mb-3 font-semibold">Categories Page</h1>
      {/* Konten utama di sini */}
      <div>
        {/* Search and Add Categorie in one line */}
        <div className="flex justify-between mb-4">
          <TableSearch
            onSearch={handleSearch}
            onReset={handleResetSearch}
            searchTerm={searchTerm}
          />
          <Link href="/dashboard/categories/create">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Create Category
            </button>
          </Link>
        </div>

        {/* Table */}
        <TableCategories
          tableData={tableData}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          handlePageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </DashboardLayout>
  );
};

export default CategoriesPage;
