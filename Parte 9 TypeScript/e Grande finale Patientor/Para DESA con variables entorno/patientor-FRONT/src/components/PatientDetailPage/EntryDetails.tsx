import React from 'react';
import { Box, Typography } from '@mui/material';
import { Entry } from '../../types'; // Asegúrate de tener esta importación correcta
import { MedicalServices, AccessTime, NoteAlt, LocalHospital } from '@mui/icons-material';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  const renderEntryIcon = (type: string) => {
    switch (type) {
      case 'HealthCheck':
        return <MedicalServices />;
      case 'Hospital':
        return <LocalHospital />;
      case 'OccupationalHealthcare':
        return <AccessTime />;
      case 'Note':
        return <NoteAlt />;
      default:
        return null;
    }
  };

  const renderEntryContent = (entry: Entry) => {
    switch (entry.type) {
      case 'HealthCheck':
        return (
          <>
            <Typography variant="body1"><strong>Health Check Type:</strong> {entry.healthCheckRating}</Typography>
            <Typography variant="body2">{entry.description}</Typography>
          </>
        );
      case 'Hospital':
        return (
          <>
            <Typography variant="body1"><strong>Discharge Date:</strong> {entry.discharge?.date}</Typography>
            <Typography variant="body1"><strong>Discharge Criteria:</strong> {entry.discharge?.criteria}</Typography>
            <Typography variant="body2">{entry.description}</Typography>
          </>
        );
      case 'OccupationalHealthcare':
        return (
          <>
            <Typography variant="body1"><strong>Employer:</strong> {entry.employerName}</Typography>
            <Typography variant="body2">{entry.description}</Typography>
          </>
        );
      case 'Note':
        return <Typography variant="body2">{entry.description}</Typography>;
      default:
        return <Typography variant="body2">Unknown entry type</Typography>;
    }
  };

  return (
    <Box style={{ marginBottom: '16px' }}>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Box style={{ marginRight: '8px' }}>
          {renderEntryIcon(entry.type)}
        </Box>
        <Typography variant="h6">{entry.date}</Typography>
      </Box>
      {renderEntryContent(entry)}
    </Box>
  );
};

export default EntryDetails;
