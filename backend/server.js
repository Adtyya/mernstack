const express = require("express");
const notes = require("./data/note");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is running ...");
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
