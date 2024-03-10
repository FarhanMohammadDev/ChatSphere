import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
		socketid: {
			type: String,
			required: true,
		},
        room: {
			type: String,
			required: true,
		},
		// password: {
		// 	type: String,
		// 	required: true,
		// 	minlength: 6,
		// },
		// gender: {
		// 	type: String,
		// 	required: true,
		// 	enum: ["male", "female"],
		// },
		// profilePic: {
		// 	type: String,
		// 	default: "",
		// },
		// createdAt, updatedAt => Member since <createdAt>
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;