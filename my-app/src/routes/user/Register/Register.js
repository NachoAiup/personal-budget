import { useState } from "react";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleChange = (e) => {
    e.target.name === "email"
      ? setEmail(e.target.value)
      : e.target.name === "name"
      ? setName(e.target.value)
      : setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    postData("/auth/register", formData).then((response) => {
      if (response.status === 201) {
        setEmail("");
        setName("");
        setPassword("");
      }
    });
  };

  return (
    <StyledPaper component="form" onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        name="email"
        onChange={handleChange}
        value={email}
        required
      />
      <TextField
        label="Nombre"
        variant="outlined"
        type="name"
        name="name"
        onChange={handleChange}
        value={name}
        required
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-password">Contraseña</InputLabel>
        <OutlinedInput
          id="outlined-password"
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
          value={password}
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
