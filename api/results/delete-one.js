import clientPromise from "../lib/mongodb.js";

export default async function handler(req, res) {

try {

```
return res.status(200).json({
  success: true,
  message: "delete-one API works"
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
