import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

const AddWord = ({ open, onClose }) => {
  const initialValues = {
    word: '',
    meaning: '',
    prayer: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Datos del formulario:', values);

    // await addWord(values);

    setSubmitting(false);
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>Add new Word</Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="word"
                as={TextField}
                label="Palabra"
                fullWidth
                margin="normal"
              />
              <Field
                name="meaning"
                as={TextField}
                label="Significado"
                fullWidth
                margin="normal"
              />
              <Field
                name="prayer"
                as={TextField}
                label="Frase o ejemplo"
                fullWidth
                margin="normal"
              />
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button onClick={onClose} sx={{ mr: 2 }} disabled={isSubmitting}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  Guardar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddWord;
