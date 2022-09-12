import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "../Link";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { APP_ROUTES } from "../../../routes/app/constants";
import { USER_ROUTES } from "../../../routes/user/constants";
import { useUserState, useUserUpdater } from "../../../providers/UserProvider";

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const LogoText = styled(Typography)`
  margin-right: ${(props) => props.theme.spacing(2)};
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  color: ${(props) => props.theme.palette.common.white};
  line-height: 1;
`;

const StyledContainer = styled(Container)`
  margin-top: ${(props) => props.theme.spacing(1)};
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

function Layout() {
  const { isLoggedIn } = useUserState();
  const setUser = useUserUpdater();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("Username");
    localStorage.removeItem("UserID");
    setUser({ isLoggedIn: false, username: null });
    navigate(APP_ROUTES.MENU);
    handleClose();
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <StyledLink to={isLoggedIn ? APP_ROUTES.HOME : USER_ROUTES.LOGIN}>
            <MonetizationOnIcon sx={{ color: "white" }} />
            <LogoText variant="h6">
              PRESUPUESTO
              <br />
              PERSONAL
            </LogoText>
          </StyledLink>
          <Box sx={{ flexGrow: 1 }}></Box>
          {isLoggedIn && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Cerrar Sesion</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <StyledContainer fixed>
        <Outlet />
      </StyledContainer>
    </div>
  );
}

export default Layout;
