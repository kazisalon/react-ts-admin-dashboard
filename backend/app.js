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
    visitDate: '12/20/2024',
    serviceType: 'OPD',
    diagnosis: 'Diabetes',
    status: 'Complete',
  },
  {
    id: 'P-002',
    name: 'Anil Regmi',
    gender: 'Male',
    age: 45,
    visitDate: '1/20/2025',
    serviceType: 'OPD',
    diagnosis: 'Diabetes',
    status: 'Complete',
  },
  {
    id: 'P-002',
    name: 'Samrat Ghimire',
    gender: 'Male',
    age: 45,
    visitDate: '3/20/2025',
    serviceType: 'OPD',
    diagnosis: 'Diabetes',
    status: 'Complete',
  },
  //
  // Add more sample data
];

// Get all patients
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

// Get patients by date
app.get('/api/patients/date/:date', (req, res) => {
  const filteredPatients = patients.filter(
    (p) => p.visitDate === req.params.date,
  );
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
