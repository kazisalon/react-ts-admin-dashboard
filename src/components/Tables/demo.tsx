import React, { useEffect, useState } from 'react';
import flatpickr from 'flatpickr';

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

  const fetchPatients = async (date?: string) => {
    try {
      const url = date
        ? `http://localhost:5000/api/patients/date/${date}`
        : 'http://localhost:5000/api/patients';
      const response = await fetch(url);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete?')) return;

    try {
      await fetch(`http://localhost:5000/api/patients/${id}`, {
        method: 'DELETE',
      });
      fetchPatients(selectedDate ?? undefined);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleView = (patient: Patient) => {
    alert(JSON.stringify(patient, null, 2));
  };

  const handleEdit = async (patient: Patient) => {
    try {
      await fetch(`http://localhost:5000/api/patients/${patient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      });
      fetchPatients(selectedDate ?? undefined);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const initializeDatePicker = () => {
    const picker = flatpickr('.form-datepicker', {
      mode: 'single',
      static: true,
      monthSelectorType: 'static',
      dateFormat: 'M/D/Y',
      onChange: (selectedDates) => {
        if (selectedDates[0]) {
          const date = selectedDates[0];
          const formattedDate = `${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`;
          setSelectedDate(formattedDate);
          fetchPatients(formattedDate);
        }
      },
      prevArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    }) as flatpickr.Instance;

    return () => {
      if (picker) picker.destroy();
    };
  };

  useEffect(() => {
    fetchPatients();
    const cleanup = initializeDatePicker();
    return cleanup;
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Patient Records
        </h4>
        <div className="relative w-48">
          <input
            className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder="Select date"
            data-class="flatpickr-right"
          />
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
            {patients.map((patient, key) => (
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
                      onClick={() => handleView(patient)}
                    >
                      View
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => handleEdit(patient)}
                    >
                      Edit
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => handleDelete(patient.id)}
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
    </div>
  );
};

export default TableThree;
