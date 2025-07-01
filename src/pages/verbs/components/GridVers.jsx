import React, { useState, useMemo } from 'react';
import GenericDataGrid from '../../../components/DataGrid';
import useFetchVerbs from '../hooks/useFetchVerbs';
import {
  Modal,
  Box,
  Typography,
  Button,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import IconButton from '@mui/material/IconButton';


const GridVers = () => {
  const [search, setSearch] = useState('');
  const { verbs, loading } = useFetchVerbs();
  const [selectedVerb, setSelectedVerb] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (value) => setSearch(value);

  const handleRowClick = (params) => {
    setSelectedVerb(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVerb(null);
  };

  const filteredRows = useMemo(() => {
    return verbs?.filter(
      (row) =>
        row.verb?.toLowerCase().includes(search.toLowerCase()) ||
        row.past?.toLowerCase().includes(search.toLowerCase()) ||
        row.participle?.toLowerCase().includes(search.toLowerCase()) 
    );
  }, [search, verbs]);


  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    const englishVoice = voices.find(voice =>
      voice.lang.startsWith('en-GB') && voice.name.toLowerCase()
    );

    if (englishVoice) {
      utterance.voice = englishVoice;
    } else {
      utterance.lang = 'en-GB';
    }

    synth.speak(utterance);
  };

  const columns = [
    { field: 'verb', headerName: 'Verbs', flex: 1 },
    { field: 'past', headerName: 'Past', flex: 2, hideOnMobile: true },
    { field: 'participle', headerName: 'Participle', flex: 2, hideOnMobile: true },
    { field: 'meaning', headerName: 'Meaning', flex: 1, sorteable:true },
    { field: 'phrase', headerName: 'Phrase', flex: 1, hideOnMobile: true },
    {
      field: 'speak',
      headerName: '',
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={(e) => {
          e.stopPropagation();
          speak(params.row.phrase);
        }}>
          <VolumeUpIcon />
        </IconButton>
      ),
    },
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
          {selectedVerb && (
            <>
              <Box display="flex" alignItems="center" gap={1} justifyContent='center'>
                <Typography variant="h4" gutterBottom>
                  {selectedVerb.verb}
                </Typography>
                <IconButton
                  aria-label="Escuchar"
                  onClick={() => speak(selectedVerb.phrase)}
                  size="small"
                >
                  <VolumeUpIcon fontSize="medium" />
                </IconButton>
              </Box>

              <Typography variant="body2" gutterBottom>
                <strong>Past:</strong>&nbsp; {selectedVerb.past}
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                <strong>Participle: </strong>&nbsp; {selectedVerb.participle}
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                <strong>Phrase: </strong>&nbsp; {selectedVerb.phrase}
              </Typography>
              <Typography variant="body2" gutterBottom color="text.secondary">
                <strong>Significado: </strong>&nbsp; {selectedVerb.meaning}
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

export default GridVers;
