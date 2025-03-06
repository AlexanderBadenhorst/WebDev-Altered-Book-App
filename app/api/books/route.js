import { NextResponse } from "next/server";
import clientPromise from "../../mongodb";

export async function GET(req) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const books = await db.collection("books").find({}).toArray();
  console.log("GET books called");
  return NextResponse.json(books);
}

export async function POST(req) {
  const { title, link, img } = await req.json();
  const client = await clientPromise;
  const db = client.db("mydatabase");
  await db.collection("books").insertOne({ title, link, img });
  return NextResponse.json("Book added successfully");
}
