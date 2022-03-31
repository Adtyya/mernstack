const express = require("express");
const notes = require("./data/note");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/notes", notesRoutes);

// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));
//   app.get("*", (req, res) => {
//     res.send(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// } else {
// }
app.get("/", (req, res) => {
  res.send("Server is running ...");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
