"use client";

import { useCart } from "@/context/CartContext";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, clearItemFromCart, clearCart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("You need to log in to proceed with the checkout.");
      router.push("/auth/login");
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderSuccess(true);
      clearCart();
      setIsCheckoutOpen(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          py: 8,
          background: "linear-gradient(to right, #f9f9f9, #ffffff)",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Your Cart is Empty
        </Typography>
        <Button
          component={Link}
          href="/products"
          variant="contained"
          color="primary"
          sx={{ mt: 4, py: 1.5, px: 4, fontSize: "1rem", borderRadius: 4 }}
        >
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6, background: "#fafafa", borderRadius: 2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333", mb: 4 }}
      >
        Your Cart
      </Typography>
      {cart.length > 0 && (
        <Alert severity="info" sx={{ mb: 4, borderRadius: 2, background: "#e8f4fd" }}>
          You have {cart.reduce((acc, item) => acc + item.quantity, 0)} items in your cart.
        </Alert>
      )}
      <Box>
        {cart.map((item) => (
          <Card
            key={item.id}
            sx={{
              display: "flex",
              mb: 3,
              p: 2,
              alignItems: "center",
              borderRadius: 3,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt={item.name}
              sx={{
                width: 100,
                height: 100,
                borderRadius: 2,
                objectFit: "cover",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            <CardContent sx={{ flex: 1, ml: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${item.price} x {item.quantity}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeFromCart(item.id)}
                size="small"
                sx={{ borderRadius: 3 }}
              >
                Remove One
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => clearItemFromCart(item.id)}
                size="small"
                sx={{ borderRadius: 3 }}
              >
                Remove All
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
          padding: "1rem",
          borderRadius: 2,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          Total: ${total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          sx={{ py: 1.5, px: 4, fontSize: "1rem", borderRadius: 4 }}
        >
          Checkout
        </Button>
      </Box>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)}>
        <DialogTitle sx={{ fontWeight: "bold" }}>Confirm Your Order</DialogTitle>
        <DialogContent>
          {isProcessing ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 4,
              }}
            >
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2, fontWeight: "500" }}>
                Processing Payment...
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Total Amount: <strong>${total.toFixed(2)}</strong>
              </Typography>
              <Typography sx={{ mt: 2, color: "text.secondary" }}>
                Do you want to proceed with the payment?
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {!isProcessing && (
            <>
              <Button
                onClick={() => setIsCheckoutOpen(false)}
                color="secondary"
                sx={{ fontWeight: "bold" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmOrder}
                variant="contained"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                Confirm Order
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Order Success Alert */}
      {orderSuccess && (
        <Alert
          severity="success"
          sx={{ mt: 4, borderRadius: 2, fontWeight: "bold" }}
          onClose={() => setOrderSuccess(false)}
        >
          Your order has been placed successfully!
        </Alert>
      )}
    </Container>
  );
}
