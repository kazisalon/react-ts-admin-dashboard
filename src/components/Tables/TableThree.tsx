
import React, { useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import {
  ViewPatientModal,
  EditPatientModal,
  DeletePatientModal,
} from './PatientModals';

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

const TableThree: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const fetchPatients = async (date?: string) => {
    try {
      const url = date
        ? `http://localhost:5000/api/patients/date/${date}`
        : 'http://localhost:5000/api/patients';
      const response = await fetch(url);
      const data = await response.json();
      setPatients(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
      setCurrentPage(1); // Reset to first page when new data is fetched
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/patients/${id}`, {
        method: 'DELETE',
      });
      fetchPatients(selectedDate ?? undefined);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = async (updatedPatient: Patient) => {
    try {
      await fetch(`http://localhost:5000/api/patients/${updatedPatient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPatient),
      });
      fetchPatients(selectedDate ?? undefined);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setTotalPages(Math.ceil(patients.length / newItemsPerPage));
    setCurrentPage(1);
  };

  // Get current page's data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return patients.slice(startIndex, endIndex);
  };

  // Export handlers
  const exportToCSV = () => {
    const headers = ['Patient ID', 'Full Name', 'Gender', 'Age', 'Visit Date', 'Service Type', 'Diagnosis', 'Status'];
    const csvContent = [
      headers.join(','),
      ...patients.map(patient => [
        patient.id,
        `"${patient.name}"`,
        patient.gender,
        patient.age,
        patient.visitDate,
        `"${patient.serviceType}"`,
        `"${patient.diagnosis}"`,
        patient.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `patient_records_${formatDate(new Date())}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    let fpInstance: flatpickr.Instance;

    const elements = document.getElementsByClassName('form-datepicker');
    if (elements.length > 0) {
      fpInstance = flatpickr(elements[0], {
        mode: 'single',
        dateFormat: 'n/j/Y',
        onChange: (selectedDates) => {
          if (selectedDates[0]) {
            const formattedDate = formatDate(selectedDates[0]);
            setSelectedDate(formattedDate);
            fetchPatients(formattedDate);
          }
        },
        onMonthChange: (selectedDates) => {
          if (selectedDates[0]) {
            const formattedDate = formatDate(selectedDates[0]);
            setSelectedDate(formattedDate);
            fetchPatients(formattedDate);
          }
        },
        prevArrow:
          '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow:
          '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
      });
    }

    fetchPatients();

    return () => {
      if (fpInstance) {
        fpInstance.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Patient Records
          </h4>
          <div className="flex items-center space-x-4">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
            >
              Export to CSV
            </button>
            <div className="relative w-48">
              <input
                className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                placeholder="Select date"
                data-class="flatpickr-right"
              />
            </div>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Patient ID
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                  Full Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Gender
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Age
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Visit Date
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Service Type
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Diagnosis
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((patient, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4">
                    {patient.id}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    {patient.name}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    {patient.gender}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    {patient.age}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    {patient.visitDate}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    {patient.serviceType}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    {patient.diagnosis}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                        patient.status === 'Complete'
                          ? 'bg-success/10 text-success'
                          : 'bg-warning/10 text-warning'
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          setSelectedPatient(patient);
                          setIsViewModalOpen(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          setSelectedPatient(patient);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          setSelectedPatient(patient);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-800"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedPatient && (
        <>
          <ViewPatientModal
            patient={selectedPatient}
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
          />

          <EditPatientModal
            patient={selectedPatient}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onEdit={handleEdit}
          />

          <DeletePatientModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={() => handleDelete(selectedPatient.id)}
          />
        </>
      )}
    </>
  );
};

export default TableThree;

