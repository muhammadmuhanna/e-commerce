"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { AppBar, Toolbar, Typography, Button, Badge, Box, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import StorefrontIcon from "@mui/icons-material/Storefront";

export default function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "0.5rem 1rem",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <Typography
          variant="h4"
          component={Link}
          href="/"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <StorefrontIcon fontSize="large" /> E-Shop
        </Typography>

        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            "@media (max-width: 600px)": {
              flexDirection: "column",
            },
          }}
        >
          <Button
            component={Link}
            href="/products"
            sx={{
              color: "text.primary",
              fontSize: "1.1rem",
              fontWeight: "500",
              textTransform: "none",
              transition: "color 0.3s",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Products
          </Button>
          <Button
            component={Link}
            href="/auth/login"
            startIcon={<LoginIcon />}
            sx={{
              color: "text.primary",
              fontSize: "1.1rem",
              fontWeight: "500",
              textTransform: "none",
              transition: "color 0.3s",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Login
          </Button>
          <IconButton
            component={Link}
            href="/cart"
            sx={{
              color: "text.primary",
              fontSize: "1.1rem",
              position: "relative",
              transition: "color 0.3s",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
