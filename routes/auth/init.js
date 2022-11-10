import { User } from "../../models/user.js";
import { Router } from "express";
const router = Router();

router.patch("/", async (req, res) => {
	let username = req.body.username;
	try {
		let user = await User.findOne({ username: username }).exec();

		if (!user) {
			return res.status(400).send("User doesn't exist.");
		}

		setTimeout(async () => {
			await User.updateOne(
				{ username: username },
				{ $set: { initLogin: false } }
			);
		}, 5000);

		res.status(200).json({
			msg: `User ${user.username} initialized successfully!`
		});
	} catch (error) {
		res.send(error);
	}
});

export default router;