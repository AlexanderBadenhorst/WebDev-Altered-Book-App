import { NextResponse } from "next/server";
import clientPromise from "../../../mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const filteredBooks = await db.collection("books").find({
    title: { $regex: query, $options: "i" },
  }).toArray();
  return NextResponse.json(filteredBooks);
}