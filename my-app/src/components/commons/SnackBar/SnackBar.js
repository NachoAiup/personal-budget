import * as React from "react";
import MuiSnackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  useSnackbarState,
  useSnackbarUpdater,
} from "../../../providers/SnackbarProvider";

export default function Snackbar() {
  const snackbarState = useSnackbarState();
  const setSnackbar = useSnackbarUpdater();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ open: false });
  };

  return (
    <MuiSnackbar
      open={snackbarState.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        elevation={6}
        onClose={handleClose}
        severity={snackbarState.severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {snackbarState.message}
      </Alert>
    </MuiSnackbar>
  );
}
