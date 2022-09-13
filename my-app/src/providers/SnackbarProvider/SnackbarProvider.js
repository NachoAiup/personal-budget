import * as React from "react";
import Snackbar from "../../components/commons/SnackBar";

const SnackbarStateContext = React.createContext();
const SnackbarUpdaterContext = React.createContext();

function SnackbarProvider({ children }) {
  const [snackbarState, setSnackbarState] = React.useState({ open: false });
  return (
    <SnackbarStateContext.Provider value={snackbarState}>
      <SnackbarUpdaterContext.Provider value={setSnackbarState}>
        {children}
        <Snackbar />
      </SnackbarUpdaterContext.Provider>
    </SnackbarStateContext.Provider>
  );
}

function useSnackbarState() {
  const snackbarState = React.useContext(SnackbarStateContext);
  if (typeof snackbarState === "undefined") {
    throw new Error("useSnackbarState must be used within a SnackbarProvider");
  }
  return snackbarState;
}

function useSnackbarUpdater() {
  const snackbarUpdater = React.useContext(SnackbarUpdaterContext);
  if (typeof snackbarUpdater === "undefined") {
    throw new Error(
      "useSnackbarUpdater must be used within a SnackbarProvider"
    );
  }
  return React.useCallback(
    (newState) =>
      snackbarUpdater((prevState) => ({ ...prevState, ...newState })),
    [snackbarUpdater]
  );
}

const SNACKBAR_SEVERITY = {
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};

export {
  SnackbarProvider,
  useSnackbarState,
  useSnackbarUpdater,
  SNACKBAR_SEVERITY,
};
