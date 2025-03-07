import { NextResponse } from "next/server";
import clientPromise from "../../mongodb";

export async function GET(req) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const quotes = await db.collection("quotes").find({}).toArray();
  console.log("GET quotes called");
  return NextResponse.json(quotes);
}

export async function POST(req) {
  const { text, author } = await req.json();
  const client = await clientPromise;
  const db = client.db("mydatabase");
  await db.collection("quotes").insertOne({ text, author });
  return NextResponse.json("Quote added successfully");
}
