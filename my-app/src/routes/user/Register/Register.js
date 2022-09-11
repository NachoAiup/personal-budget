import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StyledPaper = styled(Paper)`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 30px;
  margin-top: 60px;
`;

const Register = () => {
  return (
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
          type="password"
          label="Password"
          required
        />
      </FormControl>
      <Button variant="contained" color="success" type="submit">
        CREAR USUARIO
      </Button>
    </StyledPaper>
  );
};

export default Register;
