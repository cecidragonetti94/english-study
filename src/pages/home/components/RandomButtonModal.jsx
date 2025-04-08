import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  Collapse,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useFetchwords from '../hooks/useFetchWords';

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

  useEffect(() => {
    if (open && !dataLoading) {
      setLoading(true);
      setRevealed({});
      setTimeout(() => {
        const selected = getRandomItems(words);
        setSelectedwords(selected);
        setLoading(false);
      }, 1000);
    }
  }, [open, dataLoading, words]);

  const toggleReveal = (id) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {loading || dataLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h5" mb={2}>
              Words of the Day
            </Typography>
            {selectedwords.map((item) => (
              <Box key={item.id} mb={2} borderBottom="1px solid #eee" pb={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight="bold">{item.phrase}</Typography>
                  <IconButton onClick={() => toggleReveal(item.id)}>
                    <VisibilityIcon />
                  </IconButton>
                </Box>
                <Collapse in={revealed[item.id]}>
                  <Typography variant="body2" mt={1}><strong>Usage:</strong> {item.usage}</Typography>
                  <Typography variant="body2" color="text.secondary"><strong>Description:</strong> {item.description}</Typography>
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
