import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error("Error signing up:", error);
    return new Response(JSON.stringify({ error: "Error signing up" }), { status: 500 });
  }
}
