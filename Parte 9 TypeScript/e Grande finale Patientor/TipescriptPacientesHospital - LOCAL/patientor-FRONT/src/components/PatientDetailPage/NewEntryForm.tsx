
import React, { useState } from 'react';
import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem, Typography, Chip, Input, Checkbox, ListItemText } from '@mui/material';
import axios from 'axios';
import { EntryType, Diagnose } from '../../types'; // Asegúrate de tener esta importación correcta

interface NewEntryFormProps {
  patientId: string;
  diagnoses: Diagnose[];
  onAddEntry: (entry: Entry) => void;
}

const NewEntryForm: React.FC<NewEntryFormProps> = ({ patientId, diagnoses, onAddEntry }) => {
  const [entryType, setEntryType] = useState<EntryType>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newEntry: any = {
      description,
      date,
      specialist,
      type: entryType,
      diagnoses: selectedDiagnoses, // Agregar diagnósticos seleccionados
    };

    switch (entryType) {
      case 'HealthCheck':
        newEntry.healthCheckRating = healthCheckRating;
        break;
      case 'Hospital':
        newEntry.discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria,
        };
        break;
      case 'OccupationalHealthcare':
        newEntry.employerName = employerName;
        if (sickLeaveStart && sickLeaveEnd) {
          newEntry.sickLeave = {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          };
        }
        break;
      default:
        break;
    }

    try {
      const response = await axios.post(`http://localhost:3001/api/patients/${patientId}/entries`, newEntry); //LOCAL
      //const response = await axios.post(`https://tipescriptpacienteshospital.onrender.com/api/patients/${patientId}/entries`, newEntry);
      console.log('Nueva entrada:', response.data);
      onAddEntry(response.data);
    } catch (error) {
      console.error('Error al agregar la entrada', error);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const inputDate = e.target.value;
    const currentDate = new Date().toISOString().split('T')[0]; // Fecha actual en formato yyyy-mm-dd
    if (inputDate > currentDate) {
      alert('La fecha no puede ser mayor a la fecha actual');
      return;
    }
    setter(inputDate);
  };

  const handleDiagnosesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedDiagnoses(event.target.value as string[]);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <Typography variant="h6">Add Medical Entry</Typography>
      
      {/* Description */}
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ marginBottom: '10px' }}
      />

      {/* Date */}
      <TextField
        label="Date"
        type="date"
        fullWidth
        value={date}
        onChange={(e) => handleDateChange(e, setDate)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: '10px' }}
      />

      {/* Specialist */}
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        required
        style={{ marginBottom: '10px' }}
      />

      {/* Entry type selection */}
      <FormControl fullWidth style={{ marginBottom: '10px' }}>
        <InputLabel>Entry Type</InputLabel>
        <Select
          value={entryType}
          onChange={(e) => setEntryType(e.target.value as EntryType)}
          label="Entry Type"
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
        </Select>
      </FormControl>

      {/* Diagnoses */}
      <FormControl fullWidth style={{ marginBottom: '10px' }}>
        <InputLabel>Diagnoses</InputLabel>
        <Select
          multiple
          value={selectedDiagnoses}
          onChange={handleDiagnosesChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
        >
          {diagnoses && diagnoses.length > 0 ? (
            diagnoses.map((diagnose) => (
              <MenuItem key={diagnose.code} value={diagnose.code}>
                <Checkbox checked={selectedDiagnoses.indexOf(diagnose.code) > -1} />
                <ListItemText primary={diagnose.name} />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No diagnoses available</MenuItem>
          )}
        </Select>
      </FormControl>

      {/* HealthCheck Rating */}
      {entryType === 'HealthCheck' && (
        <TextField
          label="HealthCheck Rating"
          type="number"
          fullWidth
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(Math.min(3, Math.max(0, Number(e.target.value))))} // Restrict between 0 and 3
          required
          style={{ marginBottom: '10px' }}
          inputProps={{
            min: 0,
            max: 3,
          }}
        />
      )}

      {/* Data specific to 'Hospital' type */}
      {entryType === 'Hospital' && (
        <>
          <TextField
            label="Discharge Date"
            type="date"
            fullWidth
            value={dischargeDate}
            onChange={(e) => handleDateChange(e, setDischargeDate)}
            required
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Discharge Criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
            required
            style={{ marginBottom: '10px' }}
          />
        </>
      )}

      {/* Data specific to 'OccupationalHealthcare' type */}
      {entryType === 'OccupationalHealthcare' && (
        <>
          <TextField
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            required
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Sick Leave Start Date"
            type="date"
            fullWidth
            value={sickLeaveStart}
            onChange={(e) => handleDateChange(e, setSickLeaveStart)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Sick Leave End Date"
            type="date"
            fullWidth
            value={sickLeaveEnd}
            onChange={(e) => handleDateChange(e, setSickLeaveEnd)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: '10px' }}
          />
        </>
      )}

      <Button type="submit" variant="contained" color="primary">Add Entry</Button>
    </Box>
  );
};

export default NewEntryForm;

