import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import 'react-toastify/dist/ReactToastify.css'; // Pastikan CSS diimpor di sini
import { getRoles, createRoles, updateRoles, deleteRoles } from "@/app/services/role.service";
import { toast, ToastContainer } from "react-toastify";
import { CreateRoleDto, RoleDto } from "@/app/Dto/role/role.dto";
import TableRole from "./TableRole";
import TableSearch from "@/app/components/TableSearch";
import CreateRole from "./CreateRole";
import { BaseDto } from "@/app/Dto/Base/base.dto";

const Roles: React.FC = () => {
  // Table Data
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState<RoleDto[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Validate
  const [errors, setErrors] = useState<Partial<CreateRoleDto>>({});
  
  const [formData, setFormData] = useState<CreateRoleDto>({ name: "", description: "" });
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRoleId, setEditRoleId] = useState<string | null>(null);

  /* Validate */
  const validateForm = () => {
    const newErrors: Partial<CreateRoleDto> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Role name is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Fetch Data Roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params: BaseDto = {
          page: currentPage,
          limit: itemsPerPage,
          keyword: searchTerm,
        };
        const response = await getRoles(params);
        if (response && Array.isArray(response.data)) {
          setTableData(response.data);
          setTotalItems(response.metadata.total);
          setTotalPages(response.metadata.totalPages);
        } else {
          console.error("Expected an array but got:", response);
          setTableData([]);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleEdit = (id: string) => {
    const roleToEdit = tableData.find(role => role.id === id);
    if (roleToEdit) {
      setFormData({ name: roleToEdit.name, description: roleToEdit.description });
      setEditRoleId(id);
      setIsEditMode(true);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRoles(id);
      const params: BaseDto = {
        page: currentPage,
        limit: itemsPerPage,
        keyword: searchTerm,
      };
      const updatedResponse = await getRoles(params);
      if (updatedResponse && Array.isArray(updatedResponse.data)) {
        setTableData(updatedResponse.data);
        setTotalItems(updatedResponse.metadata.total);
        setTotalPages(updatedResponse.metadata.totalPages);
      } else {
        console.error("Expected an array but got:", updatedResponse);
        setTableData([]);
      }
      toast.success("Role deleted successfully!", { autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error("Error deleting role.", { autoClose: 2000 });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
    setEditRoleId(null);
    setFormData({ name: "", description: "" });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "" });
    setIsEditMode(false);
    setEditRoleId(null);
  };

  const handleCreateOrUpdateRole = async () => {
    console.log("handleCreateOrUpdateRole called");
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    try {
      if (isEditMode && editRoleId) {
        
        const response = await updateRoles(editRoleId, formData);
       
        if (response && response.data) {
          const params: BaseDto = {
            page: currentPage,
            limit: itemsPerPage,
            keyword: searchTerm,
          };
          const updatedResponse = await getRoles(params);
          
          if (updatedResponse && Array.isArray(updatedResponse.data)) {
            setTableData(updatedResponse.data);
            setTotalItems(updatedResponse.metadata.total);
            setTotalPages(updatedResponse.metadata.totalPages);
          } else {
            console.error("Expected an array but got:", updatedResponse);
            setTableData([]);
          }

          handleCloseModal();
          toast.success("Role updated successfully!", { autoClose: 2000 });
        } else {
          console.error("Failed to update role:", response);
          toast.error("Failed to update role.", { autoClose: 2000 });
        }

      } else {
        const response = await createRoles(formData);

        if (response && response.data) {
          const params: BaseDto = {
            page: 1,
            limit: itemsPerPage,
            keyword: searchTerm,
          };
          const updatedResponse = await getRoles(params);

          if (updatedResponse && Array.isArray(updatedResponse.data)) {
            setTableData(updatedResponse.data);
            setTotalItems(updatedResponse.metadata.total);
            setTotalPages(updatedResponse.metadata.totalPages);
            setCurrentPage(1);
          } else {
            console.error("Expected an array but got:", updatedResponse);
            setTableData([]);
          }

          handleCloseModal();
          toast.success("Role created successfully!", { autoClose: 2000 });
        } else {
          console.error("Failed to create role:", response);
          toast.error("Failed to create role.", { autoClose: 2000 });
        }
      }

    } catch (error) {
      console.error("Error creating/updating role:", error);
      toast.error("Error creating/updating role.", { autoClose: 2000 });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <ToastContainer />
      {/* Search and Add Role in one line */}
      <div className="flex justify-between mb-4">
        <TableSearch onSearch={handleSearch} onReset={handleResetSearch} searchTerm={searchTerm} />
        <CreateRole onOpenModal={handleOpenModal} />
      </div>

      {/* Table */}
      <TableRole
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

      {/* Modal Edit*/}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background abu-abu */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50"></div>
          <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{isEditMode ? "Edit Role" : "Create New Role"}</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter role name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCreateOrUpdateRole}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;