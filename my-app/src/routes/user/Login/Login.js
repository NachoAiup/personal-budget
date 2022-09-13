import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "../../../components/commons/Link";
import { USER_ROUTES } from "../constants";
import { APP_ROUTES } from "../../app/constants";
import { useUserState, useUserUpdater } from "../../../providers/UserProvider";
import {
  useSnackbarUpdater,
  SNACKBAR_SEVERITY,
} from "../../../providers/SnackbarProvider";

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

const StyledPaper = styled(Paper)`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 30px;
  margin-top: 60px;
`;

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserState();
  const setUser = useUserUpdater();
  const [showPassword, setShowPassword] = useState(false);
  const setSnackbar = useSnackbarUpdater();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(APP_ROUTES.HOME);
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    postData("/auth/login", formData)
      .then((response) => response.json())
      .then((data) => {
        if (data?.token) {
          setUser({ isLoggedIn: true, username: data.name });
          localStorage.setItem("token", data.token);
          localStorage.setItem("Username", data.name);
          localStorage.setItem("UserID", data.user_id);
          navigate(APP_ROUTES.HOME);
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
    <Container>
      <StyledPaper component="form" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          required
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-password">Contraseña</InputLabel>
          <OutlinedInput
            id="outlined-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
            required
          />
        </FormControl>
        <Button variant="contained" type="submit">
          INICIAR SESION
        </Button>
      </StyledPaper>
      <StyledPaper>
        <Link to={USER_ROUTES.REGISTER}>
          <Button variant="contained" color="success" fullWidth>
            CREAR CUENTA NUEVA
          </Button>
        </Link>
      </StyledPaper>
    </Container>
  );
};

export default Login;
