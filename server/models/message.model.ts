import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		// senderId: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "User",
		// 	required: true,
		// },
		// receiverId: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: "User",
		// 	required: true,
		// },
        senderId: {
			type: String,
			required: true,
		},
		room: {
			type: String,
			required: true,
		},
        author: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
        time: {
			type: String,
			required: true,
		},
		// createdAt, updatedAt
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;