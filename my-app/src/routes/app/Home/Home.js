import styled from "@emotion/styled";
import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Link from "../../../components/commons/Link";
import { APP_ROUTES } from "../constants";

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing(3)};
`;

const Greeting = styled(Typography)`
  ${(props) => props.theme.breakpoints.up("md")} {
    position: absolute;
    align-self: start;
  }
`;

const StyledTypography = styled(Typography)`
  font-size: 0.7rem;
  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 0.9rem;
  }
`;

const BalanceBox = styled(Box)`
  width: 250px;
  height: 80px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  &:hover {
    opacity: 0.7;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 270px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 350px;
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  flex-direction: column;
  width: 110px;
  font-size: 0.7rem;
`;

const StyledList = styled(List)`
  width: 100%;
  width: 250px;
  background: white;
  color: black;
  border-radius: 5px;
  font-size: 2rem;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`;

const trasactionsData = [
  { amount: "4.500", type: "income", date: "09/04/2022" },
  { amount: "300", type: "expenditure", date: "09/04/2022" },
  { amount: "1.300", type: "expenditure", date: "02/04/2022" },
  { amount: "1.100", type: "expenditure", date: "01/04/2022" },
  { amount: "500", type: "income", date: "29/03/2022" },
  { amount: "4.300", type: "expenditure", date: "29/03/2022" },
  { amount: "14.500", type: "income", date: "20/03/2022" },
  { amount: "3.000", type: "expenditure", date: "19/03/2022" },
  { amount: "3.200", type: "income", date: "15/03/2022" },
  { amount: "2.500", type: "income", date: "12/03/2022" },
];

const Home = () => {
  const [toggle, setToggle] = React.useState(false);
  const [hideBalance, setHideBalance] = React.useState(false);
  return (
    <Container>
      <Greeting>
        Hola, <b>Username</b>
      </Greeting>
      <StyledBox sx={{ flexDirection: "column" }}>
        <StyledBox>
          <StyledTypography variant="button">
            Estado de tu cuenta
          </StyledTypography>
          <Button
            onClick={() => {
              toggle ? setToggle(false) : setToggle(true);
              hideBalance ? setHideBalance(false) : setHideBalance(true);
            }}
          >
            <Typography color="black" fontSize={10}>
              Ocultar Saldo
            </Typography>
            {toggle ? (
              <ToggleOnIcon fontSize="large" />
            ) : (
              <ToggleOffOutlinedIcon fontSize="large" />
            )}
          </Button>
        </StyledBox>
        <BalanceBox>
          <Typography fontSize={14}>SALDO TOTAL</Typography>
          <Typography variant="h5">
            {hideBalance ? "$ •••••" : "$ 43.157,16"}
          </Typography>
        </BalanceBox>
      </StyledBox>
      <StyledBox>
        <Link to={APP_ROUTES.NEW_TRANSACTION}>
          <StyledButton variant="outlined" color="primary">
            <SwapHorizOutlinedIcon sx={{ height: 30 }} />
            <div>Registrar</div> <div>Operacion</div>
          </StyledButton>
        </Link>
        <Link to={APP_ROUTES.TRANSACTION_QUERY}>
          <StyledButton variant="outlined" color="primary">
            <RemoveRedEyeOutlinedIcon sx={{ height: 30 }} />
            Consultar Operaciones
          </StyledButton>
        </Link>
      </StyledBox>
      <StyledBox
        sx={{
          flexDirection: "column",
        }}
      >
        <Typography mb={1} variant="h6">
          Últimos registros
        </Typography>
        <StyledList>
          {trasactionsData.map((transaction) => (
            <ListItem
              sx={{
                height: "50px",
                "&:hover": {
                  bgcolor: "lightGray",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  {transaction.type === "income" ? (
                    <AddOutlinedIcon color="primary" />
                  ) : (
                    <RemoveOutlinedIcon color="primary" />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={"$" + transaction.amount}
                secondary={transaction.date}
              />
            </ListItem>
          ))}
        </StyledList>
      </StyledBox>
    </Container>
  );
};

export default Home;
