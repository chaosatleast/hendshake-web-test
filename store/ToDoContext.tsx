"use client";
import { createContext, useEffect, useState } from "react";

type Props = {
	children: React.ReactNode;
};

interface FormContextType {
	tasks: Task[];
	addTask: (task: Task) => void;
	removeTask: (id: number) => void;
}

export const FormContext = createContext<FormContextType>({
	tasks: [],
	addTask: () => {},
	removeTask: () => {},
});

export const FormContextLayout = ({ children }: Props) => {
	const [tasks, setTasks] = useState<Task[]>(() => {
		if (typeof window !== "undefined") {
			const savedTasks = localStorage.getItem("tasks");
			return savedTasks ? JSON.parse(savedTasks) : [];
		}
		return [];
	});

	const addTask = (task: Task) => {
		setTasks([...tasks, task]);
	};

	const removeTask = (id: number) => {
		setTasks(tasks.filter((task, index) => index !== id));
	};

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	return (
		<FormContext.Provider
			value={{
				tasks,

				addTask,
				removeTask,
			}}
		>
			{children}
		</FormContext.Provider>
	);
};
