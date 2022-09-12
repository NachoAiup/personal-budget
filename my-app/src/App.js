import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";
import Routes from "./routes";
import Providers from "./providers";

const theme = createTheme({
  palette: {
    primary: { main: red[900] },
    background: { default: grey[100] },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Providers>
        <Routes />
      </Providers>
    </ThemeProvider>
  );
}

export default App;
