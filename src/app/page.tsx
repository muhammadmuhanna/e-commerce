"use client";

import Link from "next/link";
import { Container, Typography, Button, Box } from "@mui/material";

export default function Home() {
  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: "center",
        py: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {/* Heading */}
      <Typography
        variant="h2"
        component="h1"
        sx={{ fontWeight: "bold", color: "text.primary" }}
      >
        Welcome to <span style={{ color: "#1976d2" }}>E-Shop</span>
      </Typography>

      {/* Subheading */}
      <Typography variant="h6" color="text.secondary">
        Discover a wide range of products and enjoy a seamless shopping
        experience.
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          component={Link}
          href="/products"
          variant="contained"
          color="primary"
          size="large"
          sx={{ px: 4 }}
        >
          Shop Now
        </Button>
        <Button
          component={Link}
          href="/auth/signup"
          variant="contained"
          color="success"
          size="large"
          sx={{ px: 4 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
