import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import MuiDialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function Dialog({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  cancelLabel,
  confirmLabel,
  title,
  content,
}) {
  return (
    <MuiDialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      {content && (
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions style={{display:'flex', justifyContent:'center'}}>
      {onCancel && (<Button onClick={onCancel} variant="outlined">{cancelLabel}</Button>)}  
        <Button onClick={onConfirm} variant='contained'>{confirmLabel}</Button>
      </DialogActions>
    </MuiDialog>
  )
}

Dialog.defaultProps = {
  isOpen: false,
  onClose: () => {},
  onCancel: () => {},
  onConfirm: () => {},
  content: null,
}

Dialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.node,
}

export default Dialog
