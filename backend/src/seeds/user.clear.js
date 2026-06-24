import "dotenv/config";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import mongoose from "mongoose";
import connectDB from "../lib/db.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

async function clearSeedData() {
  await connectDB();

  // Find all seed users
  const seedUsers = await User.find({ clerkId: /^seed_/ });
  const seedUserIds = seedUsers.map((u) => u._id);

  // Delete messages sent by or received by seed users
  const messageResult = await Message.deleteMany({
    $or: [
      { senderId: { $in: seedUserIds } },
      { receiverId: { $in: seedUserIds } }
    ]
  });

  // Delete the seed users themselves
  const userResult = await User.deleteMany({ clerkId: /^seed_/ });

  console.log(`Cleared seed data. Deleted ${userResult.deletedCount} users and ${messageResult.deletedCount} messages.`);
}

clearSeedData()
  .catch((error) => {
    console.error("Failed to clear seed users:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
