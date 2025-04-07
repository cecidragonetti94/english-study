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

const getRandomWords = (rows, count = 10) => {
  const shuffled = [...rows].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const RandomWordsModal = ({ open, onClose, rows }) => {
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    if (open) {
      setLoading(true);
      setRevealed({});
      setTimeout(() => {
        const selectedWords = getRandomWords(rows);
        setWords(selectedWords);
        setLoading(false);
      }, 1000);
    }
  }, [open, rows]);

  const toggleReveal = (id) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h5" mb={2}>
              Words of the day
            </Typography>
            {words.map((w) => (
              <Box key={w.id} mb={2} borderBottom="1px solid #eee" pb={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight="bold">{w.word}</Typography>
                  <IconButton onClick={() => toggleReveal(w.id)}>
                    <VisibilityIcon />
                  </IconButton>
                </Box>
                <Collapse in={revealed[w.id]}>
                  <Typography variant="body2" mt={1}><strong>Meaning:</strong> {w.meaning}</Typography>
                  <Typography variant="body2" color="text.secondary"><strong>Prayer:</strong> {w.prayer}</Typography>
                </Collapse>
              </Box>
            ))}
            <Box textAlign="right" mt={2}>
              <Button variant="contained" onClick={onClose}>Cerrar</Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default RandomWordsModal;
