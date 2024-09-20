import React, { useState } from 'react'; 
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { FaPlus, FaTrash } from 'react-icons/fa';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
      margin: '16px',
      width: 'calc(100% - 32px)',
      maxHeight: 'calc(100% - 32px)',
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow: '0 0 0 2px rgba(0,0,0,0.1)',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.25)',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: theme.spacing(1, 3),
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.75rem',
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
}));

const CandidateExpertForm = ({ open, onClose, title }) => {
  const [entries, setEntries] = useState([{ id: '', name: '', examClearedName: '', examAdId: '', resume: '' }]);
  const [errors, setErrors] = useState([{}]);

  const handleInputChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);

    // Clear error when user starts typing
    const newErrors = [...errors];
    newErrors[index] = { ...newErrors[index], [field]: '' };
    setErrors(newErrors);
  };

  const addEntry = () => {
    setEntries([...entries, { id: '', name: '', examClearedName: '', examAdId: '', resume: '' }]);
    setErrors([...errors, {}]);
  };

  const removeEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setEntries(newEntries);
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = entries.map(entry => ({
      id: title === 'candidate' && entry.id.trim() === '' ? 'ID is required' : '',
      name: entry.name.trim() === '' ? 'Name is required' : '',
      examClearedName: title === 'candidate' && entry.examClearedName.trim() === '' ? 'Exam name is required' : '',
      examAdId: title === 'candidate' && entry.examAdId.trim() === '' ? 'Advertisement ID is required' : '',
      resume: entry.resume.trim() === '' ? 'Resume is required' : '',
    }));
    setErrors(newErrors);
    return newErrors.every(error => Object.values(error).every(e => e === ''));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', entries);
      onClose();
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm" aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title === 'candidate' ? 'Candidate Details' : 'Expert Details'}</DialogTitle>
      <DialogContent>
        {entries.map((entry, index) => (
          <Box key={index} mb={3}>
            <Typography variant="h6" gutterBottom>
              Entry {index + 1}
              {index > 0 && (
                <IconButton onClick={() => removeEntry(index)} aria-label="Remove entry" size="small" sx={{ ml: 1 }}>
                  <FaTrash />
                </IconButton>
              )}
            </Typography>

            {/* Conditional fields based on title */}
            {title === 'candidate' && (
              <>
                <StyledTextField
                  autoFocus={index === 0}
                  margin="dense"
                  id={`id-${index}`}
                  label="ID"
                  type="text"
                  fullWidth
                  value={entry.id}
                  onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                  error={!!errors[index]?.id}
                  helperText={errors[index]?.id}
                />
                <StyledTextField
                  autoFocus={index === 0}
                  margin="dense"
                  id={`id-${index}`}
                  label="Name"
                  type="text"
                  fullWidth
                  value={entry.id}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  error={!!errors[index]?.id}
                  helperText={errors[index]?.id}
                />
                <StyledTextField
                  margin="dense"
                  id={`examClearedName-${index}`}
                  label="Exam Cleared Name"
                  type="text"
                  fullWidth
                  value={entry.examClearedName}
                  onChange={(e) => handleInputChange(index, 'examClearedName', e.target.value)}
                  error={!!errors[index]?.examClearedName}
                  helperText={errors[index]?.examClearedName}
                />
                <StyledTextField
                  margin="dense"
                  id={`examAdId-${index}`}
                  label="Advertisement ID"
                  type="text"
                  fullWidth
                  value={entry.examAdId}
                  onChange={(e) => handleInputChange(index, 'examAdId', e.target.value)}
                  error={!!errors[index]?.examAdId}
                  helperText={errors[index]?.examAdId}
                />
                <StyledTextField
                  margin="dense"
                  id={`resume-${index}`}
                  label="Resume"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  value={entry.resume}
                  onChange={(e) => handleInputChange(index, 'resume', e.target.value)}
                  error={!!errors[index]?.resume}
                  helperText={errors[index]?.resume}
                />
              </>
            )}

            {title === 'expert' && (
              <>
                <StyledTextField
                  autoFocus={index === 0}
                  margin="dense"
                  id={`id-${index}`}
                  label="ID"
                  type="text"
                  fullWidth
                  value={entry.id}
                  onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                  error={!!errors[index]?.id}
                  helperText={errors[index]?.id}
                />
                <StyledTextField
                  autoFocus={index === 0}
                  margin="dense"
                  id={`id-${index}`}
                  label="Name"
                  type="text"
                  fullWidth
                  value={entry.id}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  error={!!errors[index]?.id}
                  helperText={errors[index]?.id}
                />
                <StyledTextField
                  margin="dense"
                  id={`resume-${index}`}
                  label="Resume"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  value={entry.resume}
                  onChange={(e) => handleInputChange(index, 'resume', e.target.value)}
                  error={!!errors[index]?.resume}
                  helperText={errors[index]?.resume}
                />
              </>
            )}
          </Box>
        ))}

        <StyledButton
          onClick={addEntry}
          variant="outlined"
          startIcon={<FaPlus />}
          fullWidth
          aria-label="Add more entries"
        >
          Add More
        </StyledButton>
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={onClose} color="primary">
          Cancel
        </StyledButton>
        <StyledButton onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

// Parent component to control the popup
const CandidateExpertFormPopup = () => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('candidate'); // Default to 'candidate', can be set dynamically

  const handleClickOpen = (type) => {
    setFormType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => handleClickOpen('candidate')}>
        Add Candidate Form
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleClickOpen('expert')}>
        Add Expert Form
      </Button>
      <CandidateExpertForm open={open} onClose={handleClose} title={formType} />
    </>
  );
};

export default CandidateExpertFormPopup;
