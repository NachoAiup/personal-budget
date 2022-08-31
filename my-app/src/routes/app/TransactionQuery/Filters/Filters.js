import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { months } from "../../../../utils/date";
import { categories } from "../../../../utils/serverData";

const Filters = ({
  type,
  yearsArr,
  month,
  year,
  category,
  handleMonthChange,
  handleTypeChange,
  handleCategoryChange,
  handleYearChange,
}) => {
  return (
    <>
      <FormControl size="small">
        <InputLabel id="month-label">Mes</InputLabel>
        <Select
          onChange={handleMonthChange}
          labelId="month-label"
          id="month"
          name="month"
          label="Mes"
          defaultValue={month}
        >
          {months.map((month, index) => (
            <MenuItem value={index + 1} key={index + 1}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel id="year-label">Año</InputLabel>
        <Select
          onChange={handleYearChange}
          labelId="year-label"
          id="year"
          name="year"
          label="Año"
          defaultValue={year}
        >
          {yearsArr.map((year, index) => (
            <MenuItem value={year} key={index + 1}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: "120px" }}>
        <InputLabel id="transactionType-label">Tipo</InputLabel>
        <Select
          onChange={handleTypeChange}
          labelId="transactionType-label"
          id="transactionType"
          label="Tipo"
          defaultValue={type}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="expenditure">Egreso</MenuItem>
          <MenuItem value="income">Ingreso</MenuItem>
        </Select>
      </FormControl>
      {type === "expenditure" && (
        <FormControl size="small">
          <InputLabel id="categoria-label">Categoria</InputLabel>
          <Select
            labelId="categoria-label"
            variant="outlined"
            id="categoria"
            name="categoria"
            label="Categoria"
            defaultValue={category}
            onChange={handleCategoryChange}
          >
            <MenuItem value="all">Todos</MenuItem>
            {categories.map((categoria, index) => (
              <MenuItem value={categoria} key={index + 1}>
                {categoria}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default Filters;
