import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },

    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
},{timestamps: true});

export default mongoose.model("User", userSchema);