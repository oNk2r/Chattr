// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Message from "./models/message.model.js";
import connectDB from "./lib/db.js";
import cors from "cors";
import dns from "dns";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});