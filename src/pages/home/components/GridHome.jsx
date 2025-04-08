import React, { useState, useMemo } from 'react';
import GenericDataGrid from '../../../components/DataGrid';
import useFetchphrases from '../hooks/useFetchWords';
import {
  Modal,
  Box,
  Typography,
  Button,
} from '@mui/material';

const GridHome = () => {
  const [search, setSearch] = useState('');
  const { words, loading } = useFetchphrases();
  const [selectedWord, setSelectedWord] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (value) => setSearch(value);

  const handleRowClick = (params) => {
    setSelectedWord(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedWord(null);
  };

  const filteredRows = useMemo(() => {
    return words?.filter(
      (row) =>
        row.phrase?.toLowerCase().includes(search.toLowerCase()) ||
        row.usage?.toLowerCase().includes(search.toLowerCase()) ||
        row.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, words]);

  const columns = [
    { field: 'phrase', headerName: 'Phrase' },
    { field: 'usage', headerName: 'Usage', hideOnMobile: true },
    { field: 'description', headerName: 'Description', hideOnMobile: true },
  ];

  return (
    <>
      <GenericDataGrid
        rows={filteredRows}
        columns={columns}
        loading={loading}
        onChange={handleChange}
        value={search}
        buttonAdd={false}
        onRowClick={handleRowClick}
      />

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
            width: 390,
          }}
        >
          {selectedWord && (
            <>
              <Typography variant="h4" gutterBottom>
                {selectedWord.phrase}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Usage: </strong> {selectedWord.usage}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Description: </strong> {selectedWord.description}
              </Typography>
              <Box mt={2} textAlign="right">
                <Button variant="contained" onClick={handleClose}>
                  Cerrar
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default GridHome;
