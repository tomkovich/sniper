import { createMuiTheme } from "@material-ui/core";

export const THEME = createMuiTheme({
  typography: {
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    secondary: {
      main: "#0C5FF9",
      light: "#70D4F9",
    },
  },
  sidebarWidth: "240px",
  colors: {
    link: "#1976d2",
    sidebar: "#181E36",
    primaty: "#fff",
    light: "#3e3e3e",
  },
});
