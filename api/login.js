import clientPromise from "./lib/mongodb.js";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {

    const { username, password } = req.body;

    const client = await clientPromise;

    const db = client.db("shar3ia");

    const user = await db.collection("users").findOne({
      username: username,
      password: password
    });

    if (!user) {

      return res.status(401).json({
        success: false,
        message: "بيانات الدخول غير صحيحة"
      });

    }

    return res.status(200).json({
      success: true,
      username: user.username,
      role: user.role
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

}