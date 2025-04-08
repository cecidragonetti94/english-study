import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const InputSearch = ({ text, onChange }) => {
  const [localValue, setLocalValue] = useState(text || '');

  const handleChange = (event) => {
    const searchText = event.target.value;
    setLocalValue(searchText);
    onChange(searchText);
  };
  return (
<TextField
  value={localValue}
  onChange={handleChange}
  type="text"
  size="small"
  sx={{ width: '23rem' }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </InputAdornment>
    ),
    sx: {
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: '#EEF3FF',
      },
      '&.Mui-focused': {
        backgroundColor: 'white',
      },
    },
  
    
  }}
/>

  );
};

export default InputSearch;
