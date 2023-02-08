import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Ubuntu', sans-serif`,
    body: `'Ubuntu', sans-serif`,
  },
  colors: {
    brand: {
      100: "#251b37",
      200: "#FFCACA",
      300: "#FFECEF",
      400: "#372948",
      500: "#F2D1D1",
    },
  },
});

export default theme;
