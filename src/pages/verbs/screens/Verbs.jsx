import React, { useState } from 'react';
import { Box, Stack, Button } from '@mui/material';
import GridVerbs from '../components/GridVers';
import RandomWordsModal from '../components/RandomButtonModal';

const Verbs = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box p={3}>

      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setOpenModal(true)}>
        Practice
      </Button>


      <Stack spacing={4}>
        <GridVerbs />
      </Stack>
      <RandomWordsModal open={openModal} onClose={() => setOpenModal(false)}  />
    </Box>
  );
};

export default Verbs;
