import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const FILE = "./data.json";

app.get("/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

app.post("/add-user", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));

  data.users.push(req.body);

  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

  res.json({ message: "User added" });
});
app.put("/update-user/:email", (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE, "utf-8"));

  const index = data.users.findIndex(
    (u) => u.email === req.params.email
  );

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  data.users[index] = {
    ...data.users[index],
    ...req.body,
  };

  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

  res.json({ message: "User updated", user: data.users[index] });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});