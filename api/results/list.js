import clientPromise from "../lib/mongodb.js";

export default async function handler(req, res) {

  try {

    const client = await clientPromise;

    const db = client.db("shar3ia");

    const results = await db
      .collection("results")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({
      success: true,
      count: results.length,
      results
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

}