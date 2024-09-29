import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

interface CreateRoleProps {
  onOpenModal: () => void;
}

const CreateRole: React.FC<CreateRoleProps> = ({ onOpenModal }) => {
  return (
    <div className="flex justify-end mb-4">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded flex items-center shadow-md hover:bg-green-600"
        title="Add"
        onClick={onOpenModal}
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add
      </button>
    </div>
  );
};

export default CreateRole;