import React, { useState } from 'react';

interface Patient {
  id: string;
  name: string;
  gender: string;
  age: number;
  visitDate: string;
  serviceType: string;
  diagnosis: string;
  status: string;
}

// Base Modal Component
const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-boxdark p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute -right-2 -top-2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

// View Modal Component
export const ViewPatientModal = ({
  patient,
  isOpen,
  onClose,
}: {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
      <div className="space-y-3">
        {Object.entries(patient).map(([key, value]) => (
          <div key={key} className="grid grid-cols-3 gap-2">
            <span className="font-medium capitalize">{key}:</span>
            <span className="col-span-2">
              {key === 'status' ? (
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                    value === 'Complete'
                      ? 'bg-success/10 text-success'
                      : 'bg-warning/10 text-warning'
                  }`}
                >
                  {value}
                </span>
              ) : (
                value
              )}
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

// Edit Modal Component
export const EditPatientModal = ({
  patient,
  isOpen,
  onClose,
  onEdit,
}: {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (updatedPatient: Patient) => void;
}) => {
  const [editedPatient, setEditedPatient] = useState<Patient>(patient);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(editedPatient);
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Edit Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            value={editedPatient.name}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 dark:bg-boxdark"
          />
        </div>
        <div>
          <label className="block mb-1">Age</label>
          <input
            name="age"
            type="number"
            value={editedPatient.age}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 dark:bg-boxdark"
          />
        </div>
        <div>
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={editedPatient.gender}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 dark:bg-boxdark"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Service Type</label>
          <input
            name="serviceType"
            value={editedPatient.serviceType}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 dark:bg-boxdark"
          />
        </div>
        <div>
          <label className="block mb-1">Diagnosis</label>
          <input
            name="diagnosis"
            value={editedPatient.diagnosis}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 dark:bg-boxdark"
          />
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={editedPatient.status}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2 dark:bg-boxdark"
          >
            <option value="Complete">Complete</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-boxdark"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

// Delete Modal Component
export const DeletePatientModal = ({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
      <p className="mb-6">
        Are you sure you want to delete this patient record? This action cannot
        be undone.
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-boxdark"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onDelete();
            onClose();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};
