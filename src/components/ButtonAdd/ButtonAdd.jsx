import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

const SquareButton = ({ isOpen, onClick, title, disabled }) => {
  return (
    <Tooltip title={title} arrow>
      <StyledIconButton isOpen={isOpen} onClick={onClick} style={{ marginTop: '0px' }} disabled={disabled}>
        <AddIcon />
      </StyledIconButton>
    </Tooltip>
  );
};

const StyledIconButton = styled(
  React.forwardRef(({ isOpen, ...other }, ref) => (
    <IconButton ref={ref} {...other} />
  ))
)(({ theme, isOpen }) => ({
  width: '55px',
  height: '55px',
  borderRadius: '8px',
  backgroundColor: isOpen ? theme.palette.primary.dark : theme.palette.primary.dark,
  color: theme.palette.common.white,
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: isOpen ? theme.palette.primary.dark : '#9c5b5d',
  },
}));

export default SquareButton;
