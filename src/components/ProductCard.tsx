"use client";

import { useCart } from "@/context/CartContext";
import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";

export default function ProductCard({ product }: { product: any }) {
    const { addToCart } = useCart();

    return (
        <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ height: 200, objectFit: "cover" }}
            />
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                

                <Button
                    onClick={() =>
                        addToCart({
                            id: product._id,  
                            name: product.name,
                            price: product.price,
                            image: product.image,
                        })
                    }
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Add to Cart
                </Button>


            </CardActions>
        </Card>
    );
}
