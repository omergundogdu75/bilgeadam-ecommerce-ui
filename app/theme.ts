// app/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0070f3", // mavi ton
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#f9f9f9",
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,
  },
});

export default theme;
