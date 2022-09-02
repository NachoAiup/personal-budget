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

const NewTransaction = () => {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const [values, setValues] = useState({
    importe: "0",
  });
  const currentDate = new Date().toISOString().split("T")[0];

  const handleAmountChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
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
    console.log(formData);
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
