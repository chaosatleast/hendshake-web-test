"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FormContext } from "@/store/ToDoContext";
import { useContext, useEffect, useState } from "react";
import TaskForm from "./TaskForm";

export default function Home() {
	const [isAdding, setIsAdding] = useState(false);

	const { tasks, removeTask } = useContext(FormContext);

	const [isLoaded, setIsLoaded] = useState(false);
	const handleAddFormCancel = () => {
		setIsAdding(false);
	};

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	return (
		<div className="max-w-5xl mx-auto p-4 ">
			<Button onClick={() => setIsAdding(true)}>Add To-Do</Button>

			{/* Table of Tasks*/}
			<div className="py-10">
				{isLoaded ? `Total of tasks: ${tasks.length}` : "Loading..."}
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Activity</TableHead>
						<TableHead>Price ($)</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>Booking?</TableHead>
						<TableHead>Accessibility</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoaded &&
						tasks.map((task, index) => (
							<TableRow key={index}>
								<TableCell>{task.activity}</TableCell>
								<TableCell>${task.price}</TableCell>
								<TableCell>{task.type}</TableCell>
								<TableCell>
									<Checkbox
										checked={task.bookingRequired}
										disabled
									/>
								</TableCell>
								<TableCell>{task.accessibility}</TableCell>
								<TableCell>
									<Button
										size="sm"
										variant="destructive"
										onClick={() => removeTask(index)}
									>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>

			{isAdding && (
				<TaskForm
					isAdding={isAdding}
					handleAddFormCancel={handleAddFormCancel}
				/>
			)}
		</div>
	);
}
