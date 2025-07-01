import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  Collapse
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useFetchVerbs from '../hooks/useFetchVerbs';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
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

const RandomverbsModal = ({ open, onClose }) => {
  const { verbs, loading: dataLoading } = useFetchVerbs();
  const [loading, setLoading] = useState(true);
  const [selectedVerbs, setSelectedVerbs] = useState([]);
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    if (open && !dataLoading) {
      setLoading(true);
      setRevealed({});
      setTimeout(() => {
        const selected = getRandomItems(verbs);
        setSelectedVerbs(selected);
        setLoading(false);
      }, 1000);
    }
  }, [open, dataLoading, verbs]);

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

  const refreshVerbs = () => {
    setLoading(true);
    setRevealed({});
    setTimeout(() => {
      const selected = getRandomItems(verbs);
      setSelectedVerbs(selected);
      setLoading(false);
    }, 500);
  };

  const handleClose = () => {
    onClose();
  };

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
              Verbs of the Day
            </Typography>

            <Box display="flex" justifyContent="flex-end" mb={2}>
              <IconButton onClick={refreshVerbs} color="primary" size="small">
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
              {selectedVerbs.map((item) => (
                <Box key={item.id} mb={2} borderBottom="1px solid #eee" pb={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight="bold">{item.verb}</Typography>
                    <span style={{ fontSize: '0.8em', color: '#888', display: 'flex', gap: '0.5em' }}>
                      <IconButton onClick={() => toggleReveal(item.id)} size="small">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => speak(item.phrase)} size="small">
                        <VolumeUpIcon fontSize="small" />
                      </IconButton>
                    </span>
                  </Box>
                  <Collapse in={revealed[item.id]}>
                    <Typography variant="body2" mt={1}><strong>Past:</strong> &nbsp;{item.past}</Typography>
                    <Typography variant="body2"><strong>Participle:</strong> &nbsp;{item.participle}</Typography>
                    <Typography variant="body2"><strong>Meaning:</strong> &nbsp;{item.meaning}</Typography>
                    <Typography variant="body2" color="text.secondary"><strong>Phrase:</strong> &nbsp;{item.phrase}</Typography>
                  </Collapse>
                </Box>
              ))}
            </Box>

            <Box textAlign="right">
              <Button variant="contained" onClick={handleClose}>Cerrar</Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default RandomverbsModal;
