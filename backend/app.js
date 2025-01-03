const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let patients = [
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