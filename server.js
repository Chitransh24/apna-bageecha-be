const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(cors())
// app.use(notFound);
// app.use(errorHandler);

app.use(express.json()); // to accept json data
app.use("/api/user", userRoutes);
app.listen(PORT, console.log(`Server running on PORT ${PORT}...`));
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);
