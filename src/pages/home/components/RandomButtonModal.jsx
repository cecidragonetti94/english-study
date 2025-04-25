import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  Collapse,
  Autocomplete,
  TextField
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useFetchwords from '../hooks/useFetchWords';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import useFetchCategories from '../hooks/useFetchCategories';
import RefreshIcon from '@mui/icons-material/Refresh';

const style = {
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

const getRandomItems = (list, count = 10) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const RandomWordsModal = ({ open, onClose }) => {
  const { words, loading: dataLoading } = useFetchwords();
  const [loading, setLoading] = useState(true);
  const [selectedwords, setSelectedwords] = useState([]);
  const [revealed, setRevealed] = useState({});
  const { categories } = useFetchCategories();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tempCategories, setTempCategories] = useState([]);

  useEffect(() => {
    if (open && !dataLoading) {
      setLoading(true);
      setRevealed({});
      setTimeout(() => {
        const filteredWords = selectedCategories.length > 0
          ? words.filter(w => selectedCategories.includes(w.category))
          : words;

        const selected = getRandomItems(filteredWords);
        setSelectedwords(selected);
        setLoading(false);
      }, 1000);
    }
  }, [open, dataLoading, words, selectedCategories]);


  const toggleReveal = (id) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };
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
  const refreshWords = () => {
    setLoading(true);
    setRevealed({});
    setTimeout(() => {
      const filteredWords = selectedCategories.length > 0
        ? words.filter(w => selectedCategories.includes(w.category))
        : words;

      const selected = getRandomItems(filteredWords);
      setSelectedwords(selected);
      setLoading(false);
    }, 500);
  };


  const handleClose = () => {
    setSelectedCategories([]);
    setTempCategories([]);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
        {loading || dataLoading ? (
          <Box display="flex" justifyContent="center" flex={1}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h5" mb={2}>
              Words of the Day
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Autocomplete
                multiple
                fullWidth
                disableCloseOnSelect
                options={categories}
                value={tempCategories}
                onChange={(e, newValue) => setTempCategories(newValue)}
                onClose={() => setSelectedCategories(tempCategories)}
                renderTags={(value, getTagProps) => {
                  if (value.length === 0) return null;

                  const visibleTags = value.slice(0, 2);
                  const hiddenCount = value.length - visibleTags.length;

                  return [
                    ...visibleTags.map((option, index) => (
                      <span key={option} style={{ marginRight: 6 }}>
                        {option}
                      </span>
                    )),
                    hiddenCount > 0 && (
                      <span
                        key="count-chip"
                        style={{
                          background: '#e0e0e0',
                          borderRadius: '12px',
                          padding: '2px 8px',
                          fontSize: '0.75rem',
                        }}
                      >
                        +{hiddenCount} más
                      </span>
                    )
                  ];
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filtrar por categoría"
                    size="small"
                  />
                )}
                sx={{
                  flexGrow: 1,
                  '.MuiAutocomplete-inputRoot': {
                    minHeight: 40,
                    maxHeight: 40,
                    overflow: 'hidden',
                  },
                }}
              />



              <IconButton onClick={refreshWords} color="primary" size="small">
                <RefreshIcon />
              </IconButton>
            </Box>


            <Box
              sx={{
                overflowY: 'auto',
                flex: 1,
                pr: 1,
                mb: 2,
              }}
            >
              {selectedwords.map((item) => (
                <Box key={item.id} mb={2} borderBottom="1px solid #eee" pb={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight="bold">{item.phrase}</Typography>
                    <span style={{ fontSize: '0.8em', color: '#888', display: 'flex', gap: '0.5em' }}>
                      <IconButton onClick={() => toggleReveal(item.id)} size="small">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => speak(item.phrase)} size="small">
                        <VolumeUpIcon ontSize="small" />
                      </IconButton>
                    </span>

                  </Box>
                  <Collapse in={revealed[item.id]}>
                    <Typography variant="body2" mt={1}><strong>Usage:</strong> &nbsp;{item.usage}</Typography>
                    <Typography variant="body2" color="text.secondary"><strong>Description:</strong>&nbsp;{item.description}
                    </Typography>
                  </Collapse>
                </Box>
              ))}
            </Box>
            <Box textAlign="right">
              <Button variant="contained" onClick={() => handleClose()}>Cerrar</Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default RandomWordsModal;
