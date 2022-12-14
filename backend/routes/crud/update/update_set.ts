//@ts-nocheck
import User from "../../../models/user.js";
import { Router, Request, Response }  from "express";
const router = Router();

router.post("/", async (req: Request, res: Response) => {
	try {
		const { username, machine_id, sets } = req.body;

		let user = await User.findOne({ username: username });

		if (!user) {
			return res.status(400).json({ msg: "User does not exist." });
		}

		let workout = user.workouts[user.workouts.length - 1];

		if (!workout) {
			return res.status(400).json({ msg: "You have no current workout." });
		}

		let machine = workout.machines.find(
			(machine: { machine_id: any; }) => machine.machine_id === machine_id
		);

		if (!machine) {
			return res.status(400).json({ msg: "Machine does not exist." });
		}

		sets.forEach((set: any) => {
			machine.sets.push(set);
		});

		await user.save();

		res.status(200).json({ msg: "Sets added successfully.", workout });
	} catch (error) {
		res.send(error);
	}
});

export default router;
