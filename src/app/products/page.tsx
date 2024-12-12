"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Alert,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import ProductCard from "@/components/ProductCard";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]); // Added Product type
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error(`Error fetching products: ${res.statusText}`);
        }

        const data: Product[] = await res.json(); // Explicit typing for API response
        setProducts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Add product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);
    setAddSuccess(null);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price), // Ensure price is a number
          image: formData.image,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add product");
      }

      const newProduct: Product = await res.json(); // Typed response
      setProducts((prev) => [...prev, newProduct]); // Add new product to the state
      setAddSuccess("Product added successfully!");
      setFormData({ name: "", description: "", price: "", image: "" });
      setIsModalOpen(false); // Close the modal
    } catch (err: any) {
      setAddError(err.message);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "", price: "", image: "" });
    setAddError(null);
    setAddSuccess(null);
  };

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Alert severity="error">Failed to load products: {error}</Alert>
      </Container>
    );
  }

  // Main component rendering
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Our Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add Product
        </Button>
      </Box>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Add Product Modal */}
      <Dialog open={isModalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddProduct}>
            {addError && <Alert severity="error" sx={{ mb: 2 }}>{addError}</Alert>}
            {addSuccess && <Alert severity="success" sx={{ mb: 2 }}>{addSuccess}</Alert>}
            <TextField
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              required
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <DialogActions>
              <Button onClick={handleModalClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Product
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
 