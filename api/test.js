import clientPromise from "./lib/mongodb.js";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;

    const db = client.db("shar3ia");

    const users = await db
      .collection("users")
      .find({})
      .toArray();

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}