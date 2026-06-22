import clientPromise from "../lib/mongodb.js";

export default async function handler(req, res) {

  try {

    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed"
      });
    }

    const {
      username,
      score,
      total,
      percentage
    } = req.body;

    const client = await clientPromise;

    const db = client.db("shar3ia");

    const result = {
      username,
      score,
      total,
      percentage,
      createdAt: new Date()
    };

    console.log("Saving Result:", result);

    await db.collection("results").insertOne(result);

    return res.status(200).json({
      success: true
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

}