import { NextResponse } from "next/server";
import clientPromise from "../../../mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(request, { params }) {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  await db.collection("quotes").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ message: "Quote deleted successfully" });
}