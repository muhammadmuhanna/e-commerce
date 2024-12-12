"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { CartProvider } from "@/context/CartContext";
import { CssBaseline, ThemeProvider, createTheme, Box, Container } from "@mui/material";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Define a custom Material-UI theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2", // Primary color (blue)
      },
      secondary: {
        main: "#dc004e", // Secondary color (pink)
      },
      background: {
        default: "#f5f5f5", // Light gray background
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  });

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          {/* Reset CSS with Material-UI's CssBaseline */}
          <CssBaseline />
          <CartProvider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                bgcolor: "background.default",
              }}
            >
              {/* Navbar */}
              <Navbar />
              {/* Main Content */}
              <Container
                component="main"
                sx={{
                  flexGrow: 1,
                  py: 4,
                }}
              >
                {children}
              </Container>
              {/* Footer */}
              <Footer />
            </Box>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
