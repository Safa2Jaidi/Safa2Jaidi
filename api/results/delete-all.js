import clientPromise from "../lib/mongodb.js";

export default async function handler(req, res) {

try {

```
if (req.method !== "POST") {
  return res.status(405).json({
    success: false
  });
}

const { username, password } = req.body;

if (
  username !== "Safa2" ||
  password !== "123456789"
) {
  return res.status(401).json({
    success: false
  });
}

const client = await clientPromise;

const db = client.db("shar3ia");

const result = await db
  .collection("results")
  .deleteMany({});

return res.status(200).json({
  success: true,
  deletedCount: result.deletedCount
});
```

} catch (error) {

```
return res.status(500).json({
  success: false,
  error: error.message
});
```

}

}
