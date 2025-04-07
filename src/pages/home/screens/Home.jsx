import React, {useState} from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import GridHome from '../components/GridHome';
import RandomWordsModal from '../components/RandomButtonModal';

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const mockRows = [
    { id: 1, word: 'sleep', meaning: 'dormir', prayer: 'you have to sleep like Rhysand' },
    { id: 2, word: 'eat', meaning: 'comer', prayer: 'you have to eat like Rhysand' },
    { id: 3, word: 'poop', meaning: 'caca', prayer: 'you have to poop like rhysand' },
    { id: 4, word: 'run', meaning: 'correr', prayer: 'you have to run like Rhysand' },
    { id: 5, word: 'fly', meaning: 'volar', prayer: 'you have to fly like Rhysand' },
    { id: 6, word: 'fight', meaning: 'pelear', prayer: 'you have to fight like Rhysand' },
  ];
  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Meaning Table
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpenModal(true)}>
        Random Words
      </Button>


      <Stack spacing={4}>
        <GridHome />
      </Stack>
      <RandomWordsModal open={openModal} onClose={()=> setOpenModal(false)} rows={mockRows} />
      </Box>
  );
};

export default Home;
