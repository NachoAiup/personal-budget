import { useState } from "react";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <StyledPaper>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
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
            required
          />
        </FormControl>
        <Button variant="contained">INICIAR SESION</Button>
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
