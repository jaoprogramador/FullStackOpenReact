import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, List, ListItem } from '@mui/material';
import { Patient, Entry, Diagnose } from '../../types';
import EntryDetails from './EntryDetails';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import NewEntryForm from './NewEntryForm'; // Importa el formulario

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnose[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientResponse = await axios.get(`http://localhost:3001/api/patients/${id}`);//LOCAL
        //const patientResponse = await axios.get(`https://tipescriptpacienteshospital.onrender.com/api/patients/${id}`);
        //setPatient(patientResponse.data);
setPatient({ ...patientResponse.data, entries: patientResponse.data.entries || [] });

        const diagnosesResponse = await axios.get('http://localhost:3001/api/diagnoses');//LOCAL
        //const diagnosesResponse = await axios.get('https://tipescriptpacienteshospital.onrender.com/api/diagnoses');
        setDiagnoses(diagnosesResponse.data);

        setLoading(false);
      } catch (err) {
        setError('Error fetching patient details or diagnoses');
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  /* const handleAddEntry = (newEntry: Entry) => {
    /* if (patient) {
      setPatient({
        ...patient,
        entries: [...(patient.entries || []), newEntry],
        //entries: [...patient.entries, newEntry],
      });
    } REFRESNCO DE ENTRADAS TRAS ADD
      setPatient((prev) => 
        prev 
          ? { ...prev, entries: [...prev.entries, newEntry] } 
          : null
      );
    
  }; */
  const handleAddEntry = async (newEntry: Entry) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/patients/${id}`);
      //const response = await axios.get(`https://tipescriptpacienteshospital.onrender.com/api/patients/${id}`);
      setPatient({ ...response.data, entries: response.data.entries || [] });
    } catch (err) {
      console.error('Error al actualizar el estado del paciente', err);
    }
  };
  

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!patient) {
    return <Typography color="error">Patient not found</Typography>;
  }

  const renderGenderIcon = (gender: string) => {
    switch (gender) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      case 'other':
        return <TransgenderIcon />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography variant="body1">Date of Birth: {patient.dateOfBirth}</Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      <Typography variant="body1">SSN: {patient.ssn}</Typography>
      <Box style={{ marginTop: '8px' }}>
        {renderGenderIcon(patient.gender)}
      </Box>

      {/* Entradas médicas */}
      <Typography variant="h5" style={{ marginTop: '16px' }}>Entries</Typography>
      <List>
        {patient.entries.map((entry: Entry) => (
          <ListItem key={entry.id}>
            <EntryDetails entry={entry} />
          </ListItem>
        ))}
      </List>

      {/* Agregar nueva entrada */}
      {/* <NewEntryForm patientId={id} onAddEntry={handleAddEntry} /> */}
      {/* REFRESNCO DE ENTRADAS TRAS ADD */}
      <NewEntryForm 
        patientId={id} 
        diagnoses={diagnoses || []} 
        onAddEntry={handleAddEntry} 
/>
    </Box>
  );
};

export default PatientDetail;
