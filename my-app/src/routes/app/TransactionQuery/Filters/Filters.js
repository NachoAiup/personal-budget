import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { months } from "../../../../utils/date";
import { categories } from "../../../../utils/serverData";

async function getData(url = "") {
  let token = localStorage.getItem("token");
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

const Filters = ({ form, setForm }) => {
  const [yearsArr, setYearsArr] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    name === "year"
      ? setForm({
          ...form,
          [name]: value,
          date: value + "-" + form.month.toString().padStart(2, "0") + "-%",
        })
      : name === "month"
      ? setForm({
          ...form,
          [name]: value,
          date: form.year + "-" + value.toString().padStart(2, "0") + "-%",
        })
      : setForm({
          ...form,
          [name]: value,
        });
  };

  useEffect(() => {
    getData("/transactions/getTransactionsYears")
      .then((res) => res.json())
      .then((data) => setYearsArr(data));
  }, []);

  return (
    <>
      <FormControl size="small">
        <InputLabel id="month-label">Mes</InputLabel>
        <Select
          onChange={handleChange}
          labelId="month-label"
          id="month"
          name="month"
          label="Mes"
          defaultValue={form.month}
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
          onChange={handleChange}
          labelId="year-label"
          id="year"
          name="year"
          label="Año"
          defaultValue={form.year}
        >
          {yearsArr?.map((year, index) => (
            <MenuItem value={year.year} key={index + 1}>
              {year.year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: "120px" }}>
        <InputLabel id="transactionType-label">Tipo</InputLabel>
        <Select
          onChange={handleChange}
          labelId="transactionType-label"
          id="transactionType"
          label="Tipo"
          name="type"
          defaultValue={form.type}
        >
          <MenuItem value="all">Todos</MenuItem>
          <MenuItem value="expenditure">Egreso</MenuItem>
          <MenuItem value="income">Ingreso</MenuItem>
        </Select>
      </FormControl>
      {form.type === "expenditure" && (
        <FormControl size="small">
          <InputLabel id="categoria-label">Categoria</InputLabel>
          <Select
            labelId="categoria-label"
            variant="outlined"
            id="category"
            name="category"
            label="Categoria"
            defaultValue={form.category}
            onChange={handleChange}
          >
            <MenuItem value="all">Todos</MenuItem>
            {categories.map((category, index) => (
              <MenuItem value={category} key={index + 1}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default Filters;
