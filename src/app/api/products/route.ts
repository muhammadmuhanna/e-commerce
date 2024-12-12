import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await dbConnect();  
    const products = await Product.find({});  
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
    try {
      await dbConnect();  
  
      const body = await req.json();
  
       if (!body.name || !body.description || !body.price || !body.image) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          { status: 400 }
        );
      }
  
       const product = await Product.create({
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
      });
  
      return new Response(JSON.stringify(product), { status: 201 });
    } catch (error) {
      console.error("Error adding product:", error);
      return new Response(
        JSON.stringify({ error: "Failed to add product" }),
        { status: 500 }
      );
    }
  }
