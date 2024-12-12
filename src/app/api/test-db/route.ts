import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();
    return new Response("Database connected successfully!", { status: 200 });
  } catch (error) {
    console.error("Database connection error:", error);
    return new Response("Failed to connect to the database", { status: 500 });
  }
}
