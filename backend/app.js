const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let patients = [
  // 2025 Data
  {
    id: 'P-001',
    name: 'Bishal Bashyal',
    gender: 'Male',
    age: 45,
    visitDate: '1/3/2025',
    serviceType: 'OPD',
    diagnosis: 'Diabetes',
    status: 'Complete',
  },
  {
    id: 'P-002',
    name: 'Anil Regmi',
    gender: 'Male',
    age: 35,
    visitDate: '1/4/2025',
    serviceType: 'Emergency',
    diagnosis: 'Hypertension',
    status: 'Pending',
  },
  {
    id: 'P-003',
    name: 'Samrat Ghimire',
    gender: 'Male',
    age: 28,
    visitDate: '1/5/2025',
    serviceType: 'OPD',
    diagnosis: 'Fever',
    status: 'Complete',
  },
  {
    id: 'P-004',
    name: 'Sarah Johnson',
    gender: 'Female',
    age: 42,
    visitDate: '2/3/2025',
    serviceType: 'OPD',
    diagnosis: 'Arthritis',
    status: 'Complete',
  },
  {
    id: 'P-005',
    name: 'Maya Sharma',
    gender: 'Female',
    age: 30,
    visitDate: '2/4/2025',
    serviceType: 'Emergency',
    diagnosis: 'Migraine',
    status: 'Pending',
  },
  {
    id: 'P-006',
    name: 'Priya Patel',
    gender: 'Female',
    age: 25,
    visitDate: '1/15/2025',
    serviceType: 'OPD',
    diagnosis: 'Asthma',
    status: 'Complete',
  },
  {
    id: 'P-007',
    name: 'John Smith',
    gender: 'Male',
    age: 52,
    visitDate: '1/20/2025',
    serviceType: 'Emergency',
    diagnosis: 'Chest Pain',
    status: 'Complete',
  },
  {
    id: 'P-008',
    name: 'Emily Chen',
    gender: 'Female',
    age: 33,
    visitDate: '2/1/2025',
    serviceType: 'OPD',
    diagnosis: 'Thyroid Disorder',
    status: 'Pending',
  },
  {
    id: 'P-009',
    name: 'Raj Kumar',
    gender: 'Male',
    age: 38,
    visitDate: '2/5/2025',
    serviceType: 'Emergency',
    diagnosis: 'Appendicitis',
    status: 'Complete',
  },
  {
    id: 'P-010',
    name: 'Lisa Wong',
    gender: 'Female',
    age: 29,
    visitDate: '2/6/2025',
    serviceType: 'OPD',
    diagnosis: 'Anxiety',
    status: 'Pending',
  },
  {
    id: 'P-011',
    name: 'Michael Brown',
    gender: 'Male',
    age: 60,
    visitDate: '2/7/2025',
    serviceType: 'OPD',
    diagnosis: 'COPD',
    status: 'Complete',
  },
  {
    id: 'P-012',
    name: 'Sophia Martinez',
    gender: 'Female',
    age: 27,
    visitDate: '2/8/2025',
    serviceType: 'Emergency',
    diagnosis: 'Severe Allergic Reaction',
    status: 'Complete',
  },
  {
    id: 'P-013',
    name: 'David Wilson',
    gender: 'Male',
    age: 48,
    visitDate: '2/9/2025',
    serviceType: 'OPD',
    diagnosis: 'Lower Back Pain',
    status: 'Pending',
  },
  {
    id: 'P-014',
    name: 'Amanda Taylor',
    gender: 'Female',
    age: 36,
    visitDate: '2/10/2025',
    serviceType: 'OPD',
    diagnosis: 'Gastritis',
    status: 'Complete',
  },
  {
    id: 'P-015',
    name: 'Robert Garcia',
    gender: 'Male',
    age: 55,
    visitDate: '2/10/2025',
    serviceType: 'Emergency',
    diagnosis: 'Stroke',
    status: 'Pending',
  },
  // 2024 Data
  {
    id: 'P-016',
    name: 'Nina Patel',
    gender: 'Female',
    age: 31,
    visitDate: '12/15/2024',
    serviceType: 'OPD',
    diagnosis: 'Bronchitis',
    status: 'Complete',
  },
  {
    id: 'P-017',
    name: 'James Wilson',
    gender: 'Male',
    age: 44,
    visitDate: '12/20/2024',
    serviceType: 'Emergency',
    diagnosis: 'Kidney Stones',
    status: 'Complete',
  },
  {
    id: 'P-018',
    name: 'Aarav Sharma',
    gender: 'Male',
    age: 29,
    visitDate: '12/22/2024',
    serviceType: 'OPD',
    diagnosis: 'Sinusitis',
    status: 'Complete',
  },
  {
    id: 'P-019',
    name: 'Maria Rodriguez',
    gender: 'Female',
    age: 50,
    visitDate: '12/23/2024',
    serviceType: 'Emergency',
    diagnosis: 'Food Poisoning',
    status: 'Complete',
  },
  {
    id: 'P-020',
    name: 'Tom Anderson',
    gender: 'Male',
    age: 65,
    visitDate: '12/28/2024',
    serviceType: 'OPD',
    diagnosis: 'Osteoporosis',
    status: 'Complete',
  },
  {
    id: 'P-021',
    name: 'Lucy Chen',
    gender: 'Female',
    age: 28,
    visitDate: '11/5/2024',
    serviceType: 'Emergency',
    diagnosis: 'Fractured Arm',
    status: 'Complete',
  },
  {
    id: 'P-022',
    name: 'Hassan Ahmed',
    gender: 'Male',
    age: 37,
    visitDate: '11/10/2024',
    serviceType: 'OPD',
    diagnosis: 'Depression',
    status: 'Complete',
  },
  {
    id: 'P-023',
    name: 'Emma Thompson',
    gender: 'Female',
    age: 41,
    visitDate: '11/15/2024',
    serviceType: 'OPD',
    diagnosis: 'Insomnia',
    status: 'Complete',
  },
  {
    id: 'P-024',
    name: 'Ravi Kumar',
    gender: 'Male',
    age: 53,
    visitDate: '10/20/2024',
    serviceType: 'Emergency',
    diagnosis: 'Heart Palpitations',
    status: 'Complete',
  },
  {
    id: 'P-025',
    name: 'Sophie Martin',
    gender: 'Female',
    age: 34,
    visitDate: '10/25/2024',
    serviceType: 'OPD',
    diagnosis: 'Eczema',
    status: 'Complete',
  }
];

// Get all patients
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

// Get patients by month and year
app.get('/api/patients/date/:month/:year', (req, res) => {
  const month = parseInt(req.params.month);
  const year = parseInt(req.params.year);
  
  const filteredPatients = patients.filter(patient => {
    const [visitMonth, visitDay, visitYear] = patient.visitDate.split('/').map(Number);
    return visitMonth === month && visitYear === year;
  });
  
  res.json(filteredPatients);
});

// Add patient
app.post('/api/patients', (req, res) => {
  const patient = {
    id: `P-${String(patients.length + 1).padStart(3, '0')}`,
    ...req.body,
  };
  patients.push(patient);
  res.json(patient);
});

// Update patient
app.put('/api/patients/:id', (req, res) => {
  const index = patients.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    patients[index] = { ...patients[index], ...req.body };
    res.json(patients[index]);
  } else {
    res.status(404).json({ message: 'Patient not found' });
  }
});

// Delete patient
app.delete('/api/patients/:id', (req, res) => {
  patients = patients.filter((p) => p.id !== req.params.id);
  res.json({ message: 'Patient deleted' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));