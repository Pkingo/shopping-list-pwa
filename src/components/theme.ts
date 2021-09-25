import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Open Sans"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 15,
    body1: {
      fontSize: 15,
      lineHeight: "140%",
      fontWeight: "normal",
      letterSpacing: "-0.011em",
    },
    body2: {
      fontSize: 14,
      lineHeight: "140%",
      fontWeight: "normal",
      letterSpacing: "-0.006em",
    },
    subtitle1: {
      fontSize: 15,
      fontWeight: 600, // semibold
      lineHeight: "140%",
      letterSpacing: "-0.004em",
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 500, // medium
      lineHeight: "140%",
      letterSpacing: "-0.006em",
    },
    caption: {
      fontSize: 12,
      lineHeight: "140%",
      fontWeight: "normal",
      letterSpacing: "0",
    },
    overline: {
      fontSize: 12,
      lineHeight: "140%",
      fontWeight: "normal",
      letterSpacing: "-0.04em",
    },
    h1: {
      fontSize: 80,
      fontWeight: "normal",
      lineHeight: "140%",
      letterSpacing: "-0.022em",
    },
    h2: {
      fontSize: 40,
      fontWeight: "normal",
      lineHeight: "140%",
      letterSpacing: "-0.022em",
    },
    h3: {
      fontWeight: "normal",
      fontSize: 28,
      lineHeight: "140%",
      letterSpacing: "-0.021em",
    },
    h4: {
      fontWeight: "normal",
      fontSize: 20,
      lineHeight: "140%",
      letterSpacing: "-0.019em",
    },
    h5: {
      fontWeight: 600, // semibold
      fontSize: 18,
      lineHeight: "140%",
      letterSpacing: "-0.016em",
    },
    h6: {
      fontWeight: 500, // medium
      fontSize: 16,
      lineHeight: "140%",
      letterSpacing: "-0.017em",
    },
  },
  palette: {
    primary: {
      light: "#4c8c4a",
      main: "#1b5e20",
      dark: "#003300",
    },
    secondary: {
      light: "#ffb04c",
      main: "#f57f17",
      dark: "#bc5100",
    },
    text: {
      primary: "#000000",
      secondary: "#FFFFFF",
    },
  },
  components: {},
});

export default theme;
