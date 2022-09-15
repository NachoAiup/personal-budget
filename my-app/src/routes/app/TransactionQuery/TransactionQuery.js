import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import TransactionsTable from "./TransactionsTable";
import Filters from "./Filters";
import Container from "@mui/material/Container";
import { getCurrentMonthYear } from "../../../utils/date";
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

function numberWithDots(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getTotal(data) {
  let totalAmount = 0;
  data.forEach((x) =>
    x.type === "income"
      ? (totalAmount += parseInt(x.amount))
      : (totalAmount -= parseInt(x.amount))
  );
  return numberWithDots(totalAmount);
}

const TransactionQuery = () => {
  const [data, setData] = useState(null);
  const [balance, setBalance] = useState("");
  const [form, setForm] = useState({
    month: currentMonth,
    year: currentYear,
    type: "all",
    category: "all",
    date: currentYear + "-" + currentMonth.toString().padStart(2, "0") + "-%",
  });

  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    getData("/transactions/transactionsAmount")
      .then((res) => res.json())
      .then((data) => setBalance(getTotal(data)));
  }, []);

  useEffect(() => {
    if (form.type !== "expenditure") {
      form.category = "all";
    }
    const query = Object.entries(form)
      .filter(([key, value]) => value !== "all")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    getData(`transactions/transactionsByFilters?${query}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [form]);

  return (
    <div>
      <StyledContainer>
        <Typography variant="h6" component="h2">
          Listado de operaciones
          <Div>SALDO TOTAL: $ {balance}</Div>
        </Typography>
        {matches ? (
          <Filters form={form} setForm={setForm} />
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
              <Filters form={form} setForm={setForm} />
            </StyledAccordionDetails>
          </Accordion>
        )}
      </StyledContainer>
      <TransactionsTable data={data} />
    </div>
  );
};

export default TransactionQuery;
