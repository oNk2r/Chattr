import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/user.model.js";

export async function protectRoute(req, res, next) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    let user = await User.findOne({ clerkId: userId });

    // Auto-sync user to MongoDB if they authenticated via Clerk but don't exist in our DB yet
    // (This is critical for local development where Clerk webhooks cannot reach localhost)
    if (!user) {
      try {
        const clerkUser = await clerkClient.users.getUser(userId);
        const email =
          clerkUser.emailAddresses?.find((e) => e.id === clerkUser.primaryEmailAddressId)
            ?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress;

        const fullName =
          [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
          clerkUser.username ||
          email?.split("@")[0] ||
          "New User";

        user = await User.findOneAndUpdate(
          { clerkId: userId },
          { clerkId: userId, email, fullName, profilePic: clerkUser.imageUrl },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
      } catch (clerkError) {
        console.error("Clerk sync failed in protectRoute:", clerkError.message);
        return res.status(401).json({ message: "Unauthorized - User not synced" });
      }
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}