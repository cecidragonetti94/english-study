
import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Alert } from '@mui/material';

function CustomSnackbar({ open, message, variant, onClose, autoHideDuration, action ,color}) {
    return (
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={onClose}
          severity={variant}
          action={action}
          sx={{ width: '100%',backgroundColor:color, color:'white'}}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  }
  
  CustomSnackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
    onClose: PropTypes.func.isRequired,
    autoHideDuration: PropTypes.number,
    action: PropTypes.node,
    color: PropTypes.string,
  };
  
  CustomSnackbar.defaultProps = {
    autoHideDuration: 6000,
    action: null,
    color:''
  };
  export default CustomSnackbar