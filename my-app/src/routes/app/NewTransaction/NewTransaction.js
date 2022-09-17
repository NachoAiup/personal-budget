import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import NumberFormat from "react-number-format";
import * as React from "react";
import Button from "@mui/material/Button";
import { categories } from "../../../utils/serverData";
import {
  useSnackbarUpdater,
  SNACKBAR_SEVERITY,
} from "../../../providers/SnackbarProvider";

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

const StyledPaper = styled(Paper)`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 25px;
  margin-top: 15px;
`;

const StyledContainer = styled(Container)`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
`;

async function postData(url = "", data = {}) {
  let token = localStorage.getItem("token");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
}

const NewTransaction = () => {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [concept, setConcept] = useState("");
  const [date, setDate] = useState("");
  const setSnackbar = useSnackbarUpdater();
  const [amount, setAmount] = useState("");

  const currentDate = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    e.target.name === "date"
      ? setDate(e.target.value)
      : setConcept(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  function handleTypeChange(e) {
    setType(e.target.value);
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    formData.amount = parseInt(formData.amount.replaceAll(",", "").slice(1));
    postData("transactions", formData)
      .then((response) => {
        if (response.status === 201) {
          setSnackbar({
            open: true,
            message: "Operacion registrada con exito!",
            severity: SNACKBAR_SEVERITY.SUCCESS,
          });
          setType("");
          setCategory("");
          setConcept("");
          setDate("");
          setAmount("");
        } else {
          throw new Error();
        }
      })
      .catch((e) => {
        setSnackbar({
          open: true,
          message: "Hubo un error con el registro",
          severity: SNACKBAR_SEVERITY.ERROR,
        });
      });
  };

  return (
    <StyledPaper>
      <div>
        <Typography variant="h6" component="h2">
          NUEVA OPERACION
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledContainer>
            <FormControl size="small">
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                onChange={handleTypeChange}
                labelId="tipo-label"
                variant="outlined"
                id="type"
                name="type"
                label="Tipo"
                value={type}
                required
              >
                <MenuItem value="expenditure">Egreso</MenuItem>
                <MenuItem value="income">Ingreso</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small">
              <TextField
                size="small"
                type="text"
                id="concept"
                name="concept"
                label="Concepto"
                onChange={handleChange}
                value={concept}
                required
              ></TextField>
            </FormControl>
            <FormControl size="small">
              <TextField
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  max: currentDate,
                }}
                id="date"
                name="date"
                label="Fecha"
                onChange={handleChange}
                value={date}
                required
              ></TextField>
            </FormControl>
            <TextField
              label="Importe"
              onChange={handleAmountChange}
              name="amount"
              id="amount"
              required
              size="small"
              value={amount}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
            />
            {type === "expenditure" && (
              <FormControl size="small">
                <InputLabel id="categoria-label">Categoria</InputLabel>
                <Select
                  onChange={handleCategoryChange}
                  labelId="categoria-label"
                  variant="outlined"
                  id="category"
                  name="category"
                  label="Categoria"
                  value={category}
                >
                  {categories.map((category, index) => (
                    <MenuItem value={category} key={index + 1}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <Button type="submit" variant="outlined">
              Agregar
            </Button>
          </StyledContainer>
        </form>
      </div>
    </StyledPaper>
  );
};

export default NewTransaction;
