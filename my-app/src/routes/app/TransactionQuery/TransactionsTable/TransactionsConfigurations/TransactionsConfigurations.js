import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import NumberFormat from "react-number-format";
import * as React from "react";
import {
  useSnackbarUpdater,
  SNACKBAR_SEVERITY,
} from "../../../../../providers/SnackbarProvider";

async function putData(url = "", data = {}) {
  let token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
}

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

const TransactionsConfigurations = ({
  currentTransaction,
  open,
  onClose,
  setIsOpenFormModal,
}) => {
  const setSnackbar = useSnackbarUpdater();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    formData.amount = parseInt(formData.amount.replaceAll(",", "").slice(1));
    putData(`/transactions/${currentTransaction.transaction_id}`, formData)
      .then((response) => {
        if (response.status === 201) {
          setIsOpenFormModal(false);
          window.location.reload(false);
          setSnackbar({
            open: true,
            message: "Operacion registrada con exito!",
            severity: SNACKBAR_SEVERITY.SUCCESS,
          });
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        setIsOpenFormModal(false);
        setSnackbar({
          open: true,
          message: "Hubo un error con el registro",
          severity: SNACKBAR_SEVERITY.ERROR,
        });
      });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>MODIFICAR TRANSACCION</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ margin: "15px 0" }}>
            <TextField
              size="small"
              label="Concepto"
              variant="outlined"
              type="text"
              id="concept"
              name="concept"
              required
              defaultValue={currentTransaction?.concept}
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Importe"
              defaultValue={currentTransaction?.amount}
              name="amount"
              id="amount"
              required
              size="small"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit">Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TransactionsConfigurations;
