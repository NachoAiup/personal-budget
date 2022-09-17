import Paper from "@mui/material/Paper";
import MUITable from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import TransactionsConfigurations from "./TransactionsConfigurations";

const columns = [
  { id: "fecha", label: "FECHA" },
  { id: "descripcion", label: "DESCRIPCION" },
  { id: "importe", label: "IMPORTE", align: "right" },
  { id: "editButton", width: "10px", padding: "0px" },
  { id: "deleteButton", width: "10px", padding: "0px" },
];

function numberWithDots(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function dateFormat(date) {
  date = new Date(date);
  return (
    date.getDate().toString().padStart(2, "0") +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getFullYear()
  );
}

const StyledPaper = styled(Paper)`
  width: 95vw;
  overflow: hidden;
  transform: translateX(-50%);
  position: relative;
  left: 50%;
  margin: 15px 0px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 80vw;
    maxwidth: 1500px;
  }
`;

function getTotal(data) {
  let a = 0;
  data?.forEach((x) =>
    x.type === "income" ? (a += parseInt(x.amount)) : (a -= parseInt(x.amount))
  );
  return numberWithDots(a);
}

const Table = ({ data }) => {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [variant, setVariant] = useState("");

  const handleButtonsTransactionClick = (transaction, variant) => {
    setVariant(variant);
    setCurrentTransaction(transaction);
    setIsOpenFormModal(true);
  };

  const handleFormModalClose = () => {
    setIsOpenFormModal(false);
    setCurrentTransaction(null);
  };

  const footer = {
    fecha: "TOTAL: ",
    descripcion: null,
    importe: `$ ${getTotal(data)}`,
    editButton: null,
    deleteButton: null,
  };

  const rows = data?.map((transaction) => ({
    code: transaction.transaction_id,
    fecha: dateFormat(transaction.date),
    descripcion:
      transaction.concept +
      (transaction.category ? " - " + transaction.category : ""),
    importe: numberWithDots(
      (transaction.type === "income" ? "$ " : "$ - ") + transaction.amount
    ),
    editButton: (
      <Button>
        <EditIcon
          onClick={() => handleButtonsTransactionClick(transaction, "edit")}
        />
      </Button>
    ),
    deleteButton: (
      <Button>
        <DeleteIcon
          onClick={() => handleButtonsTransactionClick(transaction, "delete")}
        />
      </Button>
    ),
  }));

  return (
    <StyledPaper>
      <TableContainer>
        <MUITable>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    backgroundColor: "grey.300",
                    width: column.width,
                    padding: column.padding,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length ? (
              rows.map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ padding: column.padding }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow hover role="checkbox">
                <TableCell colSpan={columns?.length + 1}>
                  No hay resultados para los criterios de busqueda seleccionados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {columns.map((column) => {
                const value = footer[column.id];
                return (
                  <TableCell
                    key={column.id}
                    align="right"
                    sx={{
                      backgroundColor: "grey.200",
                      fontWeight: "700",
                      color: "black",
                      fontSize: ".9rem",
                      padding: column.padding,
                    }}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableFooter>
        </MUITable>
      </TableContainer>
      <TransactionsConfigurations
        open={isOpenFormModal}
        onClose={handleFormModalClose}
        currentTransaction={currentTransaction}
        setIsOpenFormModal={setIsOpenFormModal}
        variant={variant}
      />
    </StyledPaper>
  );
};

export default Table;
