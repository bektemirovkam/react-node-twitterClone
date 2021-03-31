// @ts-nocheck;
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    // @ts-ignore
    fontFamily: [
      "-apple-system",
      "system-ui",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Ubuntu",
      "Helvetica Neue",
      "sans-serif",
    ],
  },
  palette: {
    primary: {
      main: "#1da1f2",
      contrastText: "#fff",
    },
    error: {
      main: "#e0245e",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: 16,
        height: 40,
        textTransform: "none",
        borderRadius: 30,
      },
      contained: {
        "&$disabled": {
          backgroundColor: "#8ed0f9",
          color: "#fff",
        },
      },
    },
    MuiIconButton: {
      root: {
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.15)"
        }
      }
    },
    MuiDialog: {
      paper: {
        borderRadius: 15,
      },
    },
  },
});

export default theme;
