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
  const [values, setValues] = useState({
    importe: "0",
  });
  const currentDate = new Date().toISOString().split("T")[0];

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <StyledPaper>
      <div>
        <Typography variant="h6" component="h2">
          NUEVA OPERACION
        </Typography>
        <form>
          <StyledContainer>
            <FormControl size="small">
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                variant="outlined"
                id="tipo"
                name="tipo"
                label="Tipo"
                required
              >
                <MenuItem value="egreso">Egreso</MenuItem>
                <MenuItem value="ingreso">Ingreso</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small">
              <TextField
                size="small"
                type="text"
                id="concepto"
                name="concepto"
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
                id="fecha"
                name="fecha"
                label="Fecha"
                required
              ></TextField>
            </FormControl>
            <TextField
              label="Importe"
              //value={values.numberformat}
              onChange={handleChange}
              name="importe"
              id="importe"
              required
              size="small"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
            />
            <FormControl size="small">
              <InputLabel id="categoria-label">Categoria</InputLabel>
              <Select
                labelId="categoria-label"
                variant="outlined"
                id="categoria"
                name="categoria"
                label="Categoria"
                required
              >
                {categories.map((categoria, index) => (
                  <MenuItem value={categoria} key={index + 1}>
                    {categoria}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
