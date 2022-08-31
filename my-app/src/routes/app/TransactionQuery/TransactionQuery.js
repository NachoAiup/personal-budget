import { useState } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TransactionsTable from "./TransactionsTable";
import Filters from "./Filters";
import Container from "@mui/material/Container";
import { getCurrentMonthYear } from "../../../utils/date";
import { transactionsData } from "../../../utils/serverData";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const { currentYear, currentMonth } = getCurrentMonthYear();

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  width: "200px",
  margin: "10px 0px",
}));

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  ${(props) => props.theme.breakpoints.up("md")} {
    flex-direction: row;
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

let yearsArr = transactionsData.map((x) => x.date.slice(6, 10));
yearsArr = yearsArr.filter((v, i, a) => a.indexOf(v) === i);

const TransactionQuery = () => {
  const [month, setMonth] = useState(currentMonth);
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState(currentYear);

  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  function handleMonthChange(e) {
    setMonth(e.target.value);
  }
  function handleTypeChange(e) {
    setType(e.target.value);
  }
  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }
  function handleYearChange(e) {
    setYear(e.target.value);
  }

  return (
    <div>
      <StyledContainer>
        <Typography variant="h6" component="h2">
          Listado de operaciones
          <Div>SALDO TOTAL: $43.157,16</Div>
        </Typography>
        {matches ? (
          <Filters
            yearsArr={yearsArr}
            year={year}
            type={type}
            month={month}
            category={category}
            handleMonthChange={handleMonthChange}
            handleTypeChange={handleTypeChange}
            handleCategoryChange={handleCategoryChange}
            handleYearChange={handleYearChange}
          />
        ) : (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Filtros</Typography>
            </AccordionSummary>
            <StyledAccordionDetails>
              <Filters
                yearsArr={yearsArr}
                year={year}
                type={type}
                month={month}
                category={category}
                handleMonthChange={handleMonthChange}
                handleTypeChange={handleTypeChange}
                handleCategoryChange={handleCategoryChange}
                handleYearChange={handleYearChange}
              />
            </StyledAccordionDetails>
          </Accordion>
        )}
      </StyledContainer>
      <TransactionsTable
        month={month}
        type={type}
        category={category}
        year={year}
      />
    </div>
  );
};

export default TransactionQuery;
