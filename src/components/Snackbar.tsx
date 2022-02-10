import MuiSnackbar from '@mui/material/Snackbar';

export default function Snackbar({ message, open, onClose }) {
  return (
    <MuiSnackbar
      message={message}
      open={open}
      autoHideDuration={1500}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  )
}