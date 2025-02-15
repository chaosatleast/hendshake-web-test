"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FormContext } from "@/store/ToDoContext";
import React, { useContext, useEffect, useState } from "react";

function TaskForm({
	isAdding,
	handleAddFormCancel,
}: {
	isAdding: boolean;
	handleAddFormCancel: () => void;
}) {
	const [task, setTask] = useState<Task>({
		activity: "",
		price: 0,
		type: "",
		bookingRequired: false,
		accessibility: 0,
	});

	const { addTask } = useContext(FormContext);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (task && isAdding) {
			console.log(task);
			addTask(task);
			handleAddFormCancel();
			setTask({
				activity: "",
				price: 0,
				type: "",
				bookingRequired: false,
				accessibility: 0,
			});
		}
	};

	useEffect(() => {
		if (!isAdding) {
			setTask({
				activity: "",
				price: 0,
				type: "",
				bookingRequired: false,
				accessibility: 0,
			});
		}
	}, [isAdding]);

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-wrap gap-4 items-center pt-10"
		>
			{/* Activity */}
			<div className="flex flex-col">
				<label className="text-sm font-medium">Activity</label>
				<Input
					value={task.activity}
					onChange={(e) => setTask({ ...task, activity: e.target.value })}
					placeholder="Enter activity"
					className="w-44"
				/>
			</div>

			{/* Price */}
			<div className="flex flex-col">
				<label className="text-sm font-medium">Price ($)</label>
				<Input
					type="number"
					onChange={(e) =>
						setTask({ ...task, price: Math.abs(Number(e.target.value)) })
					}
					placeholder="0.00"
					className="w-28"
				/>
			</div>

			{/* Type */}
			<div className="flex flex-col">
				<label className="text-sm font-medium">Type</label>
				<Select
					onValueChange={(value) =>
						setTask((prev) => ({ ...prev, type: value }))
					}
					value={task.type}
				>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Select Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="education">Education</SelectItem>
						<SelectItem value="recreational">Recreational</SelectItem>
						<SelectItem value="social">Social</SelectItem>
						<SelectItem value="diy">DIY</SelectItem>
						<SelectItem value="charity">Charity</SelectItem>
						<SelectItem value="cooking">Cooking</SelectItem>
						<SelectItem value="relaxation">Relaxation</SelectItem>
						<SelectItem value="music">Music</SelectItem>
						<SelectItem value="busywork">Busywork</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Booking Required */}
			<div className="flex items-center gap-2">
				<Checkbox
					checked={task.bookingRequired}
					onCheckedChange={(checked) =>
						setTask((prev) => ({ ...prev, bookingRequired: !!checked }))
					}
				/>
				<label className="text-sm font-medium">Booking Required?</label>
			</div>

			{/* Accessibility */}
			<div className="flex flex-col">
				<label className="text-sm font-medium">Accessibility</label>
				<Slider
					defaultValue={[0.5]}
					min={0.0}
					max={1.0}
					step={0.1}
					value={[task.accessibility]}
					onValueChange={(value) =>
						setTask((prev) => ({ ...prev, accessibility: value[0] }))
					}
					className="w-40"
				/>
			</div>

			{/* Submit Button */}
			<div className="flex items-center  gap-2">
				<Button
					type="submit"
					className="ml-auto bg-green-400"
				>
					Confirm
				</Button>
				<Button
					type="submit"
					className="ml-auto"
					onClick={handleAddFormCancel}
				>
					Cancel
				</Button>
			</div>
		</form>
	);
}

export default TaskForm;
